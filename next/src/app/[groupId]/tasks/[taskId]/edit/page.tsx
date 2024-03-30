'use client'
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios, { fetcher } from "@/axios";
import { TaskResponse } from "@/types/ResponseType";
import useSWR from "swr";
import { TaskForm } from "@/components/form/TaskForm";

export default function TaskEdit({ params }: { params: { groupId: string, taskId: string } }) {

    /*  const { data, error, isLoading, mutate } = useSWR<TaskResponse>(`/${params.groupId}/tasks/${params.taskId}`, fetcher)
  
      if (error) return <div>error</div>
      if (isLoading) return <div>loading...</div>
      if (!data) return <div>no data</div>
  */
    const data = {
        id: "1",
        name: "task1",
        detail: "detail",
        max_worker_num: 1,
        min_worker_num: 1,
        exp_worker_num: 1,
        point: 1,
        creater_id: "1",
        creater_name: "user1",
        group_id: "1"
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.patch(`${params.groupId}/tasks/${params.taskId}`, {
            name: data.get("name"),
            detail: data.get("detail"),
            max_worker_num: data.get("max_worker_num"),
            min_worker_num: data.get("min_worker_num"),
            exp_worker_num: data.get("exp_worker_num"),
            point: data.get("point")
        })
            .then((response) => {
                //mutate();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (<Container component="main" maxWidth="xs" >

        <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
        >
            <Typography component="h1" variant="h5">
                仕事を編集
            </Typography>
            <TaskForm data={data} />
        </Box>
    </Container >
    );
}
