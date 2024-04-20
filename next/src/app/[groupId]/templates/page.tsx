import useSWR from "swr";
import {
  TemplateResponse,
} from "@/types/ResponseType";
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
  const { data, error, isLoading } = useSWR<{ templates: TemplateResponse[] }>(
    `/${params.groupId}/templates`,
    fetcher
  );
  if (error) return <div>error</div>;
  if (!data) return <div>no data</div>;
  if (isLoading) return <div>loading...</div>;

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
              <Link href={`${params.groupId}/templates/${template.id}`}>
                詳細
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href={`${params.groupId}/templates/${template.id}/generate`}
              >
                シフトを募集
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
