import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
    }
    accessToken: string |null;
  }

  interface User {
    id: string;
    name: string;
    access_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    sub: string;
    accessToken: string|null;
    expires: number;
  }
}
