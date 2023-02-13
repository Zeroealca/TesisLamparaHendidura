import nodemailer from "nodemailer";
import HBS from "handlebars";
import hbs from "nodemailer-express-handlebars";
import { resolve } from "path";
import { hashPassword } from "@/node/utils/auth";

interface User {
  id: number;
  name: string;
  email: string;
}
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      extname: ".hbs",
      handlebars: HBS,
      layoutsDir: resolve("./src/node/mail/templates"),
      partialsDir: resolve("./src/node/mail/templates"),
    },
    viewPath: resolve("./src/node/mail/templates"),
    extName: ".hbs",
  })
);

const sendRecoveryMail = async (user: User) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_FROM_ADDRESS,
      to: user.email,
      subject: "Cambio de contraseña",
      template: "/passrecovery",
      context: {
        mail: process.env.MAIL_USERNAME,
        name: user.name,
        id: user.id,
        enlace:
          process.env.API_URL + "/api/user/recovery-password/" + user.email,
      },
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
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
