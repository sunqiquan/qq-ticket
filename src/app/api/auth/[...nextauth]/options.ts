import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/app/db";
import bcrypt from "bcryptjs";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "password",
      name: "Username and Password",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username...",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials.password) return null;
        const user = await db.user.findUnique({
          where: {
            username: credentials.username,
          },
        });
        if (!user || !user.password) return null;

        const match = await bcrypt.compare(credentials.password, user.password);
        if (!match) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account) {
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session) {
        session.user.role = token.role || "USER";
      }
      return session;
    },
  },
};

export default options;
