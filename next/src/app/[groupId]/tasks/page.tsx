import useSWR from "swr";
import { TasksResponse } from "@/types/ResponseType";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { fetcher } from "@/axios";
import Link from "next/link";
export default function TaskList({ params }: { params: { groupId: string } }) {
  const { data, error, isLoading } = useSWR<TasksResponse>(
    `/${params.groupId}/tasks`,
    fetcher
  );
  if (error) return <div>error</div>;
  if (!data) return <div>no data</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>仕事名</TableCell>
          <TableCell>ポイント</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.name}</TableCell>
            <TableCell>{task.point}</TableCell>
            <TableCell>
              <Link href={`${params.groupId}/tasks/${task.id}`}>詳細</Link>
            </TableCell>
            <TableCell>
              <Link href={`${params.groupId}/tasks/${task.id}/edit`}>編集</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
