"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios, { fetcher } from "@/axios";
import { MultiSelect } from "@/components/form/MultiSelect";
import useSWR from "swr";
export default function ProfileEdit() {
  const [exp_task, setExpTask] = useState<string[]>([]);
  ///const { data: user } = useSWR("/users/me", fetcher);
  React.useEffect(() => {}, []);

  const user = {
    id: "1",
    name: "test",
    room_number: "test",
    groups: [{ id: "1", name: "test" }],
    exp_tasks: [{ id: "1", name: "test" }],
    create_slot: [{ id: "1", name: "test" }],
    create_task: [
      { id: "1", name: "testtesst" },
      { id: "2", name: "testtesst" },
      { id: "3", name: "testtesst" },
      { id: "4", name: "testtesst" },
      { id: "5", name: "testtesst" },
      { id: "6", name: "testtesst" },
      {
        id: "7",
        name: "test",
      },
    ],
    is_active: false,
    is_admin: true,
  };
  const tasks = [
    { id: "1", name: "test" },
    { id: "2", name: "test" },
    { id: "3", name: "test" },
    { id: "4", name: "test" },
    { id: "5", name: "test" },
    { id: "6", name: "test" },
    { id: "7", name: "test" },
  ];
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post("/register", {
        name: data.get("name"),
        room_number: data.get("room_number"),
        exp_task: exp_task,
      })
      .then((response) => {})
      .catch((err) => {});
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          プロフィールを変更
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="名前"
                autoFocus
                defaultValue={user?.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="room_number"
                label="部屋番号"
                name="room_number"
                autoComplete="room_number"
                defaultValue={user?.room_number}
              />
            </Grid>
            <Grid item xs={12}>
              <MultiSelect
                task={tasks}
                title="経験した仕事"
                exp_task={exp_task}
                setData={setExpTask}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            保存
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
