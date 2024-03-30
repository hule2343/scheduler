import useSWR from "swr";
import { ResponseBase, SlotResponse, TasksResponse } from "@/types/ResponseType";
import { Grid, List, ListItem, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { fetcher } from "@/axios";
import Link from "next/link";
export default function SlotList() {
    /*const { data, error, isLoading } = useSWR<TasksResponse>(`/${params.groupId}/tasks`, fetcher)
    if (error) return <div>error</div>
    if (!data) return <div>no data</div>
    if (isLoading) return <div>loading...</div>
    */
    const data = {
        slots: [
            {
                id: "1",
                name: "test",
                start_time: "2022-01-07T00:00:00Z",
                end_time: "2022-01-02T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            },
            {
                id: "1",
                name: "test",
                start_time: "2022-01-07T12:00:00Z",
                end_time: "2022-01-02T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            },
            {
                id: "1",
                name: "test",
                start_time: "2022-01-07T00:00:00Z",
                end_time: "2022-01-02T00:00:00Z",
                creater_id: "1",
                creater_name: "test",
                assignees: [
                    {
                        id: "1",
                        name: "test"
                    }
                ],
                task_id: "1",
                task_name: "test"
            },
        ]
    }
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
                    return <TableRow key={slot.id}>
                        <TableCell>{slot.name}</TableCell>
                        <TableCell>
                            {start_time.getMonth() + 1}月{start_time.getDate()}日 {start_time.toLocaleTimeString("ja-JP", { hour: "numeric", minute: "2-digit", hour12: false })}
                        </TableCell>
                        <TableCell>
                            <Link href={`slots/${slot.id}`}>詳細</Link>
                        </TableCell>
                        <TableCell>
                            <Link href={`slots/${slot.id}/edit`}>編集</Link>
                        </TableCell></TableRow>
                })}
            </TableBody>
        </Table>
    );
}