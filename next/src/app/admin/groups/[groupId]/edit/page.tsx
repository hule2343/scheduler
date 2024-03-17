'use client'
import axios from "@/axios";
import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { GroupForm } from "@/components/form/GroupForm";
export default function GroupEditForm({ params }: { params: { groupId: string } }) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.patch(`admin/groups/${params.groupId}`, {
            name: data.get("name"),
        })
            .then((response) => {

            })
            .catch((err) => {
                console.log(err);
            });
    };

    const data = {
        id: "1",
        name: "testGroup",
    }

    return <Container component="main" maxWidth="xs" >

        <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
        >
            <Typography component="h1" variant="h5">
            グループを編集
            </Typography>
            <GroupForm data={data} />
        </Box>
    </Container >;
}