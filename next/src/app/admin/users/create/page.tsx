import * as React from "react";
import { createTheme } from "@mui/material/styles";
import axios from "@/axios";
import { useState } from "react";
import { AdminUserForm } from "@/components/form/AdminUserForm";
import { fetcher } from "@/axios";
import useSWR from "swr";
import { TaskResponse } from "@/types/ResponseType";
const theme = createTheme();


export default function AdminUserCreate() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios
            .post("/register", {
                name: data.get("name"),
                password: data.get("password"),
                room_number: data.get("room_number"),
            })
            .then((response) => {
            })
            .catch((err) => {
            });
    };

    return <AdminUserForm handleSubmit={handleSubmit} />;
};
