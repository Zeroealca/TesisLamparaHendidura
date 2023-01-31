import { NextApiRequest, NextApiResponse } from 'next';
import { uploadFile, deleteFile, generatePublicUrl } from '@/node/drive/driveControllers';
import nextConnect from 'next-connect';
import multer from 'multer';
import pool from "@/node/config/db";
import { Usuario } from '../auth/login';

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'temp');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
});


const apiRout = nextConnect({
    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
    onError(error: any, req: NextApiRequest, res: NextApiResponse) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
});

apiRout.use(upload.single('file'));

apiRout.post(async (req: any, res: NextApiResponse) => {
    const { file } = req;
    const { user } = req.body;
    const uploadedFile = await uploadFile(file) as { id: string, name: string };
    if (!uploadedFile) {
        return res.status(500).json({
            message: 'Error uploading file'
        });
    }
    const publicUrl = await generatePublicUrl(uploadedFile.id);
    if (!publicUrl) {
        return res.status(500).json({
            message: 'Error generating public url'
        });
    }
    const result = await pool.query(
        "SELECT * FROM users WHERE email = ? ",
        [user]
    ) as Usuario[];
    await pool.query(
        "INSERT INTO images SET ?",
        { name: file.originalname, url: publicUrl, id_image: uploadedFile.id, externalId: `user_${result[0].id}_disaeses` }
    );
    return res.status(200).json({
        message: 'File uploaded successfully',
        data: { publicUrl }
    });
});

apiRout.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const { fileId } = req.body;
    const deletedFile = await deleteFile(fileId);
    if (!deletedFile) {
        return res.status(500).json({
            message: 'Error deleting file'
        });
    }
    return res.status(200).json({
        message: 'File deleted successfully',
        data: deletedFile
    });
})

export default apiRout;

export const config = {
    api: {
        bodyParser: false,
    }
}

