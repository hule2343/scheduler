"use client";
import useSWR from "swr";
import { SlotResponse } from "@/types/ResponseType";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { fetcher } from "@/axios";
import Link from "next/link";
import axios from "@/axios";
export default function SlotList({ params }: { params: { groupId: string } }) {
  const { data, error, mutate, isLoading } = useSWR<{ slots: SlotResponse[] }>(
    `/${params.groupId}/slots`,
    fetcher
  );
  if (error) return <div>error</div>;
  if (!data) return <div>no data</div>;
  if (isLoading) return <div>loading...</div>;
  const handleOnClick = (slot_id: string) => {
    axios
      .delete(`/${params.groupId}/slots/${slot_id}`)
      .then((res) => {
        mutate();
      })
      .catch((err) => {});
  };
  const handleOnDeletePrune = () => {
    axios
      .delete(`/${params.groupId}/slots`, {
        params: {
          expired: true,
        },
      })
      .then((res) => {
        mutate();
      })
      .catch((err) => {});
  };
  return (
    <>
      <Button
        onClick={() => {
          handleOnDeletePrune();
        }}
      >
        不要なシフトを削除
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>仕事名</TableCell>
            <TableCell>開始時刻</TableCell>
            <TableCell></TableCell>
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
                <TableCell>
                  <Button
                    onClick={() => {
                      handleOnClick(slot.id);
                    }}
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Link href={`/${params.groupId}/slots/create`}>新規作成</Link>
    </>
  );
}
