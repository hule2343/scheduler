"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios, { fetcher } from "@/axios";
import { RoleResponse } from "@/types/ResponseType";
import useSWR from "swr";
import { RoleForm } from "@/components/form/RoleForm";

export default function RoleEdit({
  params,
}: {
  params: { groupId: string; roleId: string };
}) {
  const { data, error, isLoading, mutate } = useSWR<RoleResponse>(
    `/${params.groupId}/roles/${params.roleId}`,
    fetcher
  );

  if (error) return <div>error</div>;
  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>no data</div>;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log(data);
    /*
    axios
      .patch(`${params.groupId}/roles/${params.roleId}`, {
        name: data.get("name"),
        permissions: data.getAll("permissions"),
      })
      .then((response) => {
        //mutate();
      })
      .catch((err) => {
        console.log(err);
      });*/
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography component="h1" variant="h5">
          ロールを編集
        </Typography>
        <RoleForm data={data} />
      </Box>
    </Container>
  );
}
