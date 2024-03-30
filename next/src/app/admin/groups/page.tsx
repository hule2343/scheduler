import useSWR from "swr";
import {
  ResponseBase,
  SlotResponse,
  TasksResponse,
} from "@/types/ResponseType";
import {
  Button,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios, { fetcher } from "@/axios";
import Link from "next/link";
export default function AdminGroupList() {
  /*const { data, error, isLoading } = useSWR<TasksResponse>(`/${params.groupId}/tasks`, fetcher)
    if (error) return <div>error</div>
    if (!data) return <div>no data</div>
    if (isLoading) return <div>loading...</div>
    */
  const data = {
    groups: [
      { id: "1", name: "test" },
      { id: "2", name: "test2" },
      { id: "3", name: "test3" },
    ],
  };
  const handleGroupDelete = (groupId: string) => {
    axios
      .delete(`groups/${groupId}/delete`)
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>グループ名</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.groups.map((group) => {
            return (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>
                  <Link href={`groups/${group.id}/edit`}>編集</Link>
                </TableCell>
                <TableCell>
                  <Link href={`groups/${group.id}/delete`}>削除</Link>
                </TableCell>
                <TableCell>
                  <Link href={`groups/${group.id}/adduser`}>
                    スーパーユーザー追加
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
