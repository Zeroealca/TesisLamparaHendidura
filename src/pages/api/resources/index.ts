import { NextApiRequest, NextApiResponse } from "next";
import {
  uploadFile,
  deleteFile,
  generatePublicUrl,
} from "@/node/drive/driveControllers";
import nextConnect from "next-connect";
import multer from "multer";
import pool from "@/node/config/db";
import { concat_url_idVideo } from "src/utils/youtube";
import { PrismaService } from "@/node/prisma/prisma.service";

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

apiRout.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const prismaService = new PrismaService();
  const resources = await prismaService.images.findMany({
    where: {
      externalId: {
        contains: "resourse-",
      },
    },
  });

  return res.status(200).json({
    data: resources,
  });
});

apiRout.use(upload.single("file"));

apiRout.post(async (req: any, res: NextApiResponse) => {
  const { file } = req;
  const { video } = req.body;
  if (file) {
    uploadFileHandler(file, res);
  }
  if (video) {
    uploadVideoHandler(video, res);
  }
  const prismaService = new PrismaService();
  const resources = await prismaService.images.findMany({
    where: {
      externalId: {
        contains: "resourse-",
      },
    },
  });

  return res.status(200).json({
    message: "File uploaded successfully",
    data: resources,
  });
});
export default apiRout;

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadFileHandler = async (file: any, res: NextApiResponse) => {
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

  const prismaService = new PrismaService();
  await prismaService.images.create({
    data: {
      name: file.originalname,
      url,
      id_image: uploadedFile.id,
      externalId: `resourse-${uploadedFile.id}`,
    },
  });
};

const uploadVideoHandler = async (id: string, res: NextApiResponse) => {
  const prismaService = new PrismaService();
  await prismaService.images.create({
    data: {
      name: id,
      url: concat_url_idVideo(id),
      id_image: id,
      externalId: `resourse-${id}`,
    },
  });
};
