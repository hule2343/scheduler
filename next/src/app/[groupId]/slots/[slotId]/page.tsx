import { ResponseBase, SlotResponse } from "@/types/ResponseType"
import useSWR from "swr"
import { fetcher } from "@/axios"
import { Typography } from "@mui/material"
import Link from "next/link"
export default function SlotDetail({ params }: { params: { groupId: string, slotId: string } }) {
    /*const {data , error, isLoading} = useSWR<{slot: SlotResponse}>(`/${params.groupId}/slots/${params.slotId}`, fetcher)
    

    if (error) return <div>error</div>
    if (isLoading) return <div>loading...</div>*/

    const data: SlotResponse = {
        id: "1",
        name: "slot1",
        start_time: "2022-01-01T00:00:00",
        end_time: "2022-01-01T01:00:00",
        creater_id: "1",
        creater_name: "user1",
        assignees: [],
        task_id: "1",
        task_name: "task1"
    }
    const start_time = new Date(data.start_time)
    const end_time = new Date(data.end_time)

    return <>
        <Typography variant="h4" component="div">{data.name}</Typography>
        <Typography variant='body1'>
            開始時刻: {start_time.getMonth() + 1}月{start_time.getDate()}日 {start_time.getHours()}:{start_time.getMinutes()}
        </Typography>
        <Typography variant='body1'>
            終了時刻: {end_time.getMonth() + 1}月{end_time.getDate()}日 {end_time.getHours()}:{end_time.getMinutes()}
        </Typography>
        <Typography variant="body1">
            仕事内容:<Link href={`/${params.groupId}/tasks/${data.task_id}`}>{data.task_name}</Link>
        </Typography>
        <Typography variant="body1">
            参加者:{data.assignees.map((assignee) => assignee.name).join(", ")}
        </Typography>
        <Typography variant="body2">
            作成者:{data.creater_name}
        </Typography>

    </>
}