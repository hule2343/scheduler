import useSWR from "swr";
import { ResponseBase, SlotResponse, TasksResponse } from "@/types/ResponseType";
import { Button, Grid, List, ListItem, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios, { fetcher } from "@/axios";
import Link from "next/link";
export default function AdminUserList() {
    /*const { data, error, isLoading } = useSWR<TasksResponse>(`/${params.groupId}/tasks`, fetcher)
    if (error) return <div>error</div>
    if (!data) return <div>no data</div>
    if (isLoading) return <div>loading...</div>
    */
    const data = {
        users: [
            { id: "1", name: "test" },
            { id: "2", name: "test2" },
            { id: "3", name: "test3" },
        ]
    }

    return (<>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ユーザー名</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.users.map((user) => {
                    return <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>
                        <Link href={`admin/users/${user.id}/edit`}>編集</Link>
                        </TableCell>
                        <TableCell>
                            <Link href={`admin/users/${user.id}/delete`}>削除</Link>
                        </TableCell></TableRow>
                })}
            </TableBody>
        </Table>
        </>
    );
}