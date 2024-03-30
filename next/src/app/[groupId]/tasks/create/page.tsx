'use client'
import axios from "@/axios";
import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { TaskForm } from "@/components/form/TaskForm";
export default function TaskCreateForm({ params }: { params: { groupId: string } }) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.post(`${params.groupId}/tasks/`, {
            name: data.get("name"),
            detail: data.get("detail"),
            max_worker_num: data.get("max_worker_num"),
            min_worker_num: data.get("min_worker_num"),
            exp_worker_num: data.get("exp_worker_num"),
            point: data.get("point")
        })
            .then((response) => {

            })
            .catch((err) => {
                console.log(err);
            });
    };

    const defaultData = {
        id: "",
        name: "",
        detail: "",
        max_worker_num: 1,
        min_worker_num: 1,
        exp_worker_num: 1,
        point: 1,
        creater_id: "",
        creater_name: "",
        group_id: params.groupId
    }

    return <Container component="main" maxWidth="xs" >

        <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
        >
            <Typography component="h1" variant="h5">
                仕事を新規作成
            </Typography>
            <TaskForm data={defaultData} />
        </Box>
    </Container >;
}