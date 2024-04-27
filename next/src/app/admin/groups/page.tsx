'use client'
import useSWR from "swr";
import {ResponseBase} from "@/types/ResponseType";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { fetcher } from "@/axios";
import Link from "next/link";

export default function AdminGroupList() {
  const { data, error, isLoading } = useSWR<{ groups: ResponseBase[] }>(
    `admin/groups`,
    fetcher
  );
  if (error) return <div>error</div>;
  if (!data) return <div>no data</div>;
  if (isLoading) return <div>loading...</div>;

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
