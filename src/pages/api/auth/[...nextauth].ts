import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import pool from "@/node/config/db";
import { comparePassword, hashPassword } from "@/node/utils/auth";

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

  session: {
    maxAge: 2592000, /// 30d
    strategy: "jwt",
    updateAge: 86400, // cada día
  },
  events: {
    signIn: async (message) => {
      console.log("signIn", message);
    },
    updateUser: async () => {
      console.log("updateUser");
    },
  },
});

const checkUserEmailPassword = async (email: string, password: string) => {
  const result = (await pool.query("SELECT * FROM users WHERE email = ? ", [
    email,
  ])) as any;
  if (result.length === 0) return null;

  const validPassword = await comparePassword(password, result[0].password);
  if (!validPassword) return null;

  const { name } = result[0];
  return {
    id: "",
    name,
    email,
  };
};
