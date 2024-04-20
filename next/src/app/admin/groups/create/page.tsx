"use client";
import axios from "@/axios";
import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { GroupForm } from "@/components/form/GroupForm";
export default function GroupCreateForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post(`admin/groups`, {
        name: data.get("name"),
      })
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const defaultData = {
    id: "",
    name: "グループ",
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography component="h1" variant="h5">
          グループを作成
        </Typography>
        <GroupForm data={defaultData} />
      </Box>
    </Container>
  );
}
