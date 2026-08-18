import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { LoginSchema } from "@s/login";
import { prisma } from "@l/prisma";
import { tgLog } from "@u/telegram-logger";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          username: user.username,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            role: token.role,
            username: token.username,
          },
        };
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await prisma.user.findFirst({
            where: { email },
          });

          if (!user || !user.hashedPassword) {
            await tgLog(
              `❌ *Login failed*\nReason: Couldn't find user\nEmail: ${email}\nTime: ${new Date().toLocaleString()}`,
            );
            return null;
          }

          const passwordMatch = await bcryptjs.compare(
            password,
            user.hashedPassword,
          );

          if (!passwordMatch) {
            await tgLog(
              `❌ *Login failed*\nReason: Wrong password\nEmail: ${email}\nTime: ${new Date().toLocaleString()}`,
            );
            return null;
          }

          await tgLog(
            `✅ *Login success*\nUser ID: ${user.id}\nUser: ${user.username ? user.username : `${user.firstName} ${user.lastName}`}\nEmail: ${email}\nTime: ${new Date().toLocaleString()}`,
          );
          return user;
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
};
