import { compare } from "bcrypt";
import { getServerSession } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/server/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

import type { SessionStrategy, DefaultSession, NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" as SessionStrategy },

  pages: { signIn: "/signIn" },

  adapter: PrismaAdapter(db) as Adapter,

  providers: [
    Credentials({
      credentials: { username: {}, password: {} },

      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user) return null;

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) return null;

        return {
          id: user.id + "",
        };
      },
    }),
  ],

  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },

    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }

      return token;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
