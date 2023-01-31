import { google } from "googleapis";
import fs from "fs";
import path from "path";

const oauth2Client = new google.auth.GoogleAuth({
  credentials: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    type: "service_account",
  },
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const uploadFile = async (file: any) => {
  const filepath = path.join("src/" + file.filename);
  try {
    const res = await drive.files.create({
      requestBody: {
        name: file.filename,
        mimeType: file.type,
        parents: [`${process.env.GOOGLE_CLIENT_FOLDERIMG}`],
      },
      media: {
        mimeType: file.type,
        body: fs.createReadStream(filepath),
      },
    });
    fs.unlinkSync(filepath);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteFile = async (fileId: string) => {
  try {
    await drive.files.delete({ fileId });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const generatePublicUrl = async (fileId: string) => {
  try {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const res = await drive.files.get({ fileId, fields: "webViewLink" });
    const { webViewLink } = res.data as { webViewLink: string };
    const arr = webViewLink.split("/");
    return `https://drive.google.com/uc?export=view&id=${arr[arr.length - 2]}`;
  } catch (error) {
    console.log(error);
  }
};

export { uploadFile, deleteFile, generatePublicUrl };
