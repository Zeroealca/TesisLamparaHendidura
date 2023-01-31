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

const checkUserEmailPassword = async (email: string, password: string) => {
  const result = (await pool.query("SELECT * FROM users WHERE email = ? ", [
    email,
  ])) as any;
  if (result.length === 0) return null;

  const validPassword = await comparePassword(password, result[0].password);
  if (!validPassword) return null;

  const images = await pool.query(
    "SELECT name, url FROM images WHERE externalId = ? ",
    [`user_${result[0].id}_disaeses`]
  );
  const { name, id } = result[0];
  return {
    id,
    name,
    email,
    images,
  };
};
