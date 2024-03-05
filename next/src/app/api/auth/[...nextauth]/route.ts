import axios from "@/axios";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;
const authOption: AuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post("/login",
                        credentials,
                        {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }},);
                    const data = response.data;
                    if (data) return data;
                } catch (error) {
                    console.error(error);
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (user.access_token) {
                return true;
            }
            return false;
        },

        async jwt({ token, user, account }) {
            if (user) {
                token.accessToken = user.access_token;
            }
            return token;
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            return session;
        }
    }
}

const handler = NextAuth(authOption);

export { handler as GET, handler as POST }