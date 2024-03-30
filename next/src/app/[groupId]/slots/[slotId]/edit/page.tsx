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
import { SlotForm } from "@/components/form/SlotForm";

export default function SlotEdit({ params }: { params: { groupId: string, slotId: string } }) {

    /*  const { data, error, isLoading, mutate } = useSWR<TaskResponse>(`/${params.groupId}/slots/${params.taskId}`, fetcher)
        const {data:taskData, error:taskError, isLoading:taskIsLoading} = useSWR<TaskResponse>(`/${params.groupId}/tasks/`, fetcher)
      if (error|taskError) return <div>error</div>
      if (isLoading|taskIsLoading) return <div>loading...</div>
      if (!data|!taskData) return <div>no data</div>

  */
    const [task_id, setData] = React.useState("None");
    const slot_data =
    {
        id: "1",
        name: "test",
        start_time: "2008-09-15T15:53:00+05:00",
        end_time: "2022-01-02T00:00:00Z",
        creater_id: "1",
        creater_name: "test",
        assignees: [
            {
                id: "1",
                name: "test"
            }
        ],
        task_id: "1",
        task_name: "test"
    }
    const taskData = {
        tasks: [
            {
                id: "1",
                name: "task1",
                detail: "test",
                max_worker_num: 1,
                min_worker_num: 1,
                exp_worker_num: 1,
                point: 1,
                creater_id: "1",
                creater_name: "test",
                group_id: "1"

            },
            {
                id: "2",
                name: "task1",
                detail: "test",
                max_worker_num: 1,
                min_worker_num: 1,
                exp_worker_num: 1,
                point: 1,
                creater_id: "1",
                creater_name: "test",
                group_id: "1"

            },
            {
                id: "3",
                name: "task1",
                detail: "test",
                max_worker_num: 1,
                min_worker_num: 1,
                exp_worker_num: 1,
                point: 1,
                creater_id: "1",
                creater_name: "test",
                group_id: "1"

            },
        ]
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get("start_time"));
        console.log((new Date(data.get("start_time") as string)).toISOString());
        axios.patch(`${params.groupId}/slots/${params.slotId}`, {
            name: data.get("name"),
            start_time: (new Date(data.get("start_time") as string)).toISOString(),
            end_time: (new Date(data.get("end_time") as string)).toISOString(),
            task_id: data.get("task_id")
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
            <SlotForm data={slot_data}
                tasks={taskData.tasks.map((task) => { return { id: task.id, name: task.name } })}
                task_id={task_id} setData={setData} />
        </Box>
        <div>{task_id}</div>
    </Container >
    );
}
