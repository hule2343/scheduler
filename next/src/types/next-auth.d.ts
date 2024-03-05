import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
    interface Session {
        accessToken: string | undefined;
    }

    interface User {
        access_token: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
    }
}