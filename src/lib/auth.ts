import prisma from "@/db";
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { createInitialDataForUser, verifyPassword } from "./userDemoData";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET",
    }),
    CredentialsProvider({
      name: 'Login With Email',
      credentials: {
        username: { label: "Email", type: "text", placeholder: "hello@todo.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials)
          return null;

        const data = await prisma.user.findFirst({
          where: {
            email: credentials.username,
          }
        })
        if (!data)
          return null;

        const isPasswordValid = await verifyPassword(credentials.password, data.password || "");
        if (!isPasswordValid)
          return null;

        return {
          id: data.id + "",
          name: data.name,
          email: data.email,
          image: data.profileImage,
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        let result = await prisma.user.findFirst({
          where: {
            email: user.email || ""
          }
        })

        if (!result) {
          result = await prisma.user.create({
            data: {
              email: user.email || "",
              name: user.name || "",
              profileImage: user.image || ""
            }
          })
          await createInitialDataForUser(result.id)
        }
        return true;
      } catch (error) {
        console.log(error)
        return false;
      }
    }
  }
}