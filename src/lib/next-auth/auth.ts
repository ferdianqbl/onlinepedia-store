import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "../firebase/auth";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const res = await signIn({ email, password });
        if (!res.status) return null;
        return res.user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if (account?.provider === "credentials") {
        token.id = user.id;
        token.email = user.email;
        token.phone = user.phone;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.phone = token.phone;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.exp = token.exp;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
