"use client";
import axios from "@/axios";
import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { GroupForm } from "@/components/form/GroupForm";
import useSWR from "swr";
import fetcher from "@/axios";
export default function GroupEditForm({
  params,
}: {
  params: { groupId: string };
}) {
  const { data, error,isLoading } = useSWR(`admin/groups/${params.groupId}`, fetcher);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .patch(`admin/groups/${params.groupId}`, {
        name: data.get("name"),
      })
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography component="h1" variant="h5">
          グループを編集
        </Typography>
        <GroupForm data={data} />
      </Box>
    </Container>
  );
}
