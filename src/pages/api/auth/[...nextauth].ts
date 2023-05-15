import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import pool from "@/node/config/db";
import { comparePassword, hashPassword } from "@/node/utils/auth";
import axios from "axios";
import https from "https";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here

    Credentials({
      name: "Custom Login",
      credentials: {
        email: {
          label: "Correo:",
          type: "email",
          placeholder: "correo@google.com",
        },
        password: {
          label: "Contraseña:",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        return await checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),
  ],

  // Custom Pages
  pages: {
    signIn: "/iniciar-sesion",
    newUser: "/registro",
  },

  // Callbacks
  jwt: {
    // secret: process.env.JWT_SECRET_SEED, // deprecated
  },

  session: {
    maxAge: 2592000, /// 30d
    strategy: "jwt",
    updateAge: 86400, // cada día
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case "credentials":
            token.user = user;
            break;
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user as any;
      return session;
    },
  },
});

interface IUSERUTM {
  cedula: string;
  nombres: string;
  tipo_usuario_array: string[];
}

const checkUserEmailPassword = async (email: string, password: string) => {
  const result = (await pool.query("SELECT * FROM users WHERE email = ? ", [
    email,
  ])) as any;
  if (result.length === 0 && email.includes("@utm.edu.ec")) {
    try {
      const res: any = await axios.post(
        process.env.URL_UTM || "",
        {
          usuario: email,
          clave: password,
        },
        {
          headers: {
            "X-API-KEY":
              process.env.X_API_KEY ||
              "3ecbcb4e62a00d2bc58080218a4376f24a8079e1",
          },
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        }
      );

      if (res.status === 200) {
        const { cedula, nombres, tipo_usuario_array } = res.data.value;
        const new_tipo_usuario_array = tipo_usuario_array.map((tipo: any) => {
          return tipo.split("|")[1];
        });

        const isDocente = new_tipo_usuario_array.includes("DOCENTE");

        const encryptpassword = await hashPassword(password);

        await pool.query("INSERT INTO users SET ?", {
          name: nombres,
          email,
          password: encryptpassword,
          rol: isDocente ? "DOCENTE" : "ESTUDIANTE",
        });

        const result = (await pool.query(
          "SELECT * FROM users WHERE email = ? ",
          [email]
        )) as any;

        const { id } = result[0];
        return {
          id,
        };
      }
    } catch (error) {
      return null;
    }
  }

  if (result.length === 0) return null;

  const validPassword = await comparePassword(password, result[0].password);
  if (!validPassword) return null;

  const { id } = result[0];
  return {
    id,
  };
};
