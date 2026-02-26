import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "@/lib/schemas/login";
import { prisma } from "@/lib/client";

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
          const { password } = validatedFields.data;

          const user = await prisma.user.findUnique({
            where: { id: password.toLowerCase() },
          });

          if (!user) return null;

          return user;
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
