import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { hashPassword } from "@/node/utils/auth";

interface User {
  id: number;
  name: string;
  email: string;
}
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
} as any);

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("../pages/api/templates"),
      defaultLayout: "false",
    } as any,
    viewPath: path.resolve("../pages/api/templates"),
    extName: ".handlebars",
  })
);

const sendRecoveryMail = async (user: User) => {
  try {
    const password = Math.random().toString(36).slice(-8);

    const mailOptions = {
      from: process.env.MAIL_FROM_ADDRESS,
      to: user.email,
      subject: "Cambio de contraseña",
      template: "/passrecovery",
      context: {
        mail: process.env.MAIL_USERNAME,
        name: user.name,
        id: user.id,
        password,
        enlace:
          process.env.API_URL +
          "/api/user/recovery-password/" +
          user.email +
          "/?password=" +
          password,
      },
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      } else {
        return true;
      }
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { sendRecoveryMail };
