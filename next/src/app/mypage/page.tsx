import {
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import useSWR from "swr";
import { fetcher } from "@/axios";
import { UserResponse } from "@/types/ResponseType";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Hiking from "@mui/icons-material/Hiking";

const style = {
  p: 0,
  width: "100%",
  maxWidth: "auto",
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

export default function MyPage() {
  ///const { data: user } = useSWR<UserResponse>("/users/me", fetcher);
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
  return (
    <>
      <List sx={style}>
        <ListItem>
          <ListItemText primary={`名前: ${user?.name}`} />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary={`部屋番号: ${user?.room_number}`} />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="所属団体" />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          {user?.groups.map((group) => (
            <Chip key={group.id} label={group.name} />
          ))}
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="経験した仕事" />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          {user?.exp_tasks.map((task) => (
            <Chip key={task.id} label={task.name} />
          ))}
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="作成した仕事" />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          {user?.create_task.map((task) => (
            <Chip key={task.id} label={task.name} />
          ))}
        </ListItem>
        <Divider component="li" />
        <ListItem>
          {user?.is_admin ? (
            <>
              <PersonAddIcon />
              <Typography>管理者</Typography>
            </>
          ) : (
            <></>
          )}
          {user?.is_active ? (
            <></>
          ) : (
            <>
              <Hiking />
              <Typography>休寮中</Typography>
            </>
          )}
        </ListItem>
      </List>
    </>
  );
}
