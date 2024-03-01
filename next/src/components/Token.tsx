import { useRouter } from "next/router";
import { useLocalStorage } from "./localStrage";
import React from "react";

export default function Token({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useLocalStorage("access_token", "");
    const router = useRouter()

    if (!token) {
        router.push("/")
    }
    return children;
}