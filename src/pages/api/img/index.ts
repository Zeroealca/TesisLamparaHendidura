import { NextApiRequest, NextApiResponse } from "next";
import {
  uploadFile,
  deleteFile,
  generatePublicUrl,
} from "@/node/drive/driveControllers";
import nextConnect from "next-connect";
import multer from "multer";
import pool from "@/node/config/db";
import { Usuario } from "../auth/login";

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const apiRout = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
  onError(error: any, req: NextApiRequest, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
});

apiRout.use(upload.single("file"));

apiRout.post(async (req: any, res: NextApiResponse) => {
  const { file } = req;
  const { id_image, user, details, state } = req.body;
  if (!id_image) {
    const uploadedFile = (await uploadFile(file)) as {
      id: string;
      name: string;
      details: string;
      state: string;
    };
    if (!uploadedFile) {
      return res.status(500).json({
        message: "Error uploading file",
      });
    }
    const url = await generatePublicUrl(uploadedFile.id);
    if (!url) {
      return res.status(500).json({
        message: "Error generating public url",
      });
    }
    const result = (await pool.query("SELECT * FROM users WHERE id = ? ", [
      user,
    ])) as Usuario[];
    await pool.query("INSERT INTO images SET ?", {
      name: file.originalname,
      url,
      id_image: uploadedFile.id,
      externalId: `user_${result[0].id}_disaeses`,
      details,
      state,
    });
    return res.status(200).json({
      message: "File uploaded successfully",
      data: { publicUrl: url },
    });
  }
  const result = (await pool.query(
    "UPDATE images set details = ? WHERE id_image = ? ",
    [details, id_image]
  )) as any;
  if (result.affectedRows === 0) {
    return res.status(404).json({
      message: "Imagen no encontrada",
      data: undefined,
    });
  }
  return res.status(200).json({
    message: "Imagen actualizada",
    data: undefined,
  });
});

apiRout.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const { fileId } = req.body;
  const deletedFile = await deleteFile(fileId);
  if (!deletedFile) {
    return res.status(500).json({
      message: "Error deleting file",
    });
  }
  return res.status(200).json({
    message: "File deleted successfully",
    data: deletedFile,
  });
});

export default apiRout;

export const config = {
  api: {
    bodyParser: false,
  },
};
