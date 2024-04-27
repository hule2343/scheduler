import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    id: string;
    name: string;
    accessToken: string;
  }

  interface User {
    id: string;
    name: string;
    access_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    accessToken: string;
  }
}
