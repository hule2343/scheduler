import axios from "@/axios";
import React, { createContext } from "react";
import useSWR, { Fetcher,KeyedMutator } from "swr";
import { UserResponse } from "@/types/ResponseType";
import { useRouter } from "next/router";
type UserContextType = {
    user: UserResponse,
    mutate:KeyedMutator<UserResponse>
}

const getCurrentUser: Fetcher<UserResponse> = (url:string) => {
    return axios.get(url).then((response) => response.data);
};

type UserManagerProps = {
    children:React.ReactNode
}

export const UserContext=createContext({} as UserContextType)

export const UserManager: React.FC<UserManagerProps> = (props:UserManagerProps) => {
    const router=useRouter()
    const { data, error,mutate } = useSWR('/me', getCurrentUser)
    if (error) router.push('/')
    if (!data) return <div>Loading...</div>
    const value = {
        user: data,
        mutate:mutate,
    }
    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
};
