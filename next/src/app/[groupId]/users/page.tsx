"use client";
import useSWR from "swr";
import { GroupUserResponse } from "@/types/ResponseType";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios, { fetcher } from "@/axios";

export default function UserList({ params }: { params: { groupId: string } }) {
  const { data, error, isLoading } = useSWR<{ users: GroupUserResponse[] }>(
    `/${params.groupId}/users`,
    fetcher
  );
  if (error) return <div>error</div>;
  if (!data) return <div>no data</div>;
  if (isLoading) return <div>loading...</div>;

  const handleRoleChange = (userId: string, role: string) => {
    axios
      .patch(`${params.groupId}/users/${userId}/role`, { role: role })
      .then((res) => {})
      .catch((error) => {});
  };

  const handleUserRemove = (userId: string) => {
    axios
      .delete(`${params.groupId}/users/${userId}`)
      .then((res) => {})
      .catch((error) => {});
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        ユーザー一覧
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ユーザー名</TableCell>
            <TableCell>部屋番号</TableCell>
            <TableCell>ポイント</TableCell>
            <TableCell>権限</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.users
            .sort((a, b) => a.point - b.point)
            .map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.room_number}</TableCell>
                  <TableCell>{user.point}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.role === "normal" ? (
                      <Button
                        onClick={() => {
                          handleRoleChange(user.id, "super");
                        }}
                      >
                        スーパーユーザーに変更
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          handleRoleChange(user.id, "normal");
                        }}
                      >
                        ノーマルユーザーに変更
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleUserRemove(user.id);
                      }}
                    >
                      除外
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}
