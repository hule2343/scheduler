"use client";
import useSWR from "swr";
import axios, { fetcher } from "@/axios";
import { GroupUsersResponse } from "@/types/ResponseType";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Box,
  Typography,
  Button,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
export default function AdminAddSuperUser({
  params,
}: {
  params: { groupId: string };
}) {
  /*
  const { data, error, isLoading } = useSWR<GroupUsersResponse>(
    `/${params.groupId}/users`,
    fetcher
  );
  if (error) return <div>error</div>;
  if (!data) return <div>no data</div>;
  if (isLoading) return <div>loading...</div>;
*/
  const data = {
    users: [
      { id: "1", name: "test", room_number: "1", role: "super" },
      { id: "2", name: "test2", room_number: "2", role: "normal" },
      { id: "3", name: "test3", room_number: "3", role: "normal" },
    ],
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const users_id = data.getAll("addUser");
    console.log(users_id);
    axios
      .post(`admin/groups/${params.groupId}/adduser`, { users: users_id })
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography component="h1" variant="h5">
          グループを編集
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ユーザー名</TableCell>
              <TableCell>部屋番号</TableCell>
              <TableCell>権限</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.room_number}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="addUser"
                          name="addUser"
                          value={user.id}
                          defaultChecked={user.role === "super" ? true : false}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label="追加"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          保存
        </Button>
      </Box>
    </Container>
  );
}
