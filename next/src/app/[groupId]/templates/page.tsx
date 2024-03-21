import useSWR from "swr";
import { ResponseBase, TasksResponse } from "@/types/ResponseType";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { fetcher } from "@/axios";
import Link from "next/link";
export default function TemplateList({
  params,
}: {
  params: { groupId: string };
}) {
  /*const { data, error, isLoading } = useSWR<TasksResponse>(`/${params.groupId}/tasks`, fetcher)
    if (error) return <div>error</div>
    if (!data) return <div>no data</div>
    if (isLoading) return <div>loading...</div>
    */
  const data = {
    templates: [
      {
        id: "1",
        name: "task1",
        point: 1,
      },
      {
        id: "2",
        name: "task2",
        point: 2,
      },
      {
        id: "3",
        name: "task3",
        point: 3,
      },
    ],
  };
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>名前</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.templates.map((template) => (
          <TableRow key={template.id}>
            <TableCell>{template.name}</TableCell>
            <TableCell>
              <Link href={`${params.groupId}/templates/${template.id}`}>詳細</Link>
            </TableCell>
            <TableCell>
              <Link href={`${params.groupId}/templates/${template.id}/generate`}>
                シフトを募集
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
