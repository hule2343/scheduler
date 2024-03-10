import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
    interface Session {
        id: string | undefined;
        name: string | undefined;
        accessToken: string | undefined;
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