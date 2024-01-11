import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signIn, signInWithGoogle } from "../firebase/auth";
import jwt from "jsonwebtoken";

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
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
      if (account?.provider === "google") {
        const data = {
          ...user,
          type: "google",
        };
        const res: any = await signInWithGoogle(data);
        if (!res.status) return null;
        token.id = res.user?.id;
        token.email = res.user?.email;
        token.name = res.user?.name;
        token.role = res.user?.role;
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

      const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", {
        algorithm: "HS256",
      });
      session.accessToken = accessToken;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
