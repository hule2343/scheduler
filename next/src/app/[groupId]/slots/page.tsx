import useSWR from "swr";
import { SlotResponse } from "@/types/ResponseType";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { fetcher } from "@/axios";
import Link from "next/link";
export default function SlotList({ params }: { params: { groupId: string } }) {
  const { data, error, isLoading } = useSWR<{ slots: SlotResponse[] }>(
    `/${params.groupId}/slots`,
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
          <TableCell>開始時刻</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.slots.map((slot) => {
          const start_time = new Date(slot.start_time);
          return (
            <TableRow key={slot.id}>
              <TableCell>{slot.name}</TableCell>
              <TableCell>
                {start_time.getMonth() + 1}月{start_time.getDate()}日{" "}
                {start_time.toLocaleTimeString("ja-JP", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: false,
                })}
              </TableCell>
              <TableCell>
                <Link href={`slots/${slot.id}`}>詳細</Link>
              </TableCell>
              <TableCell>
                <Link href={`slots/${slot.id}/edit`}>編集</Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
