import { ResponseBase, SlotResponse, TaskResponse } from "@/types/ResponseType"
import { fetcher } from "@/axios"
import { Typography } from "@mui/material"
import Link from "next/link"
export default function SlotDetail({ params }: { params: { groupId: string, taskId: string } }) {
    /*const {data , error, isLoading} = useSWR<{slot: SlotResponse}>(`/${params.groupId}/slots/${params.slotId}`, fetcher)
    

    if (error) return <div>error</div>
    if (isLoading) return <div>loading...</div>*/

    const data: TaskResponse = {
        id: "1",
        name: "slot1",
        detail: "detailfa;lksjfka;sdlkjfa;skdjf;askljd;lfkaj;slkdjf;lajskjf;kajd;lkdfja;sあｆｆｆｆｆｆｆｆｆｆｆｆｆｆっふぁあああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ",
        max_worker_num: 1,
        min_worker_num: 1,
        exp_worker_num: 1,
        point: 1,
        creater_id: "1",
        creater_name: "user1",
        group_id: "1"
    }
    return <>
        <Typography variant="h4" component="div">{data.name}</Typography>
        <Typography variant='body1'>
            仕事内容：{data.detail}
        </Typography>
        <Typography variant='body1'>
            最大参加者数: {data.max_worker_num}
        </Typography>
        <Typography variant='body1'>
            最低参加者数: {data.min_worker_num}
        </Typography>
        <Typography variant='body1'>
            最低経験者数: {data.exp_worker_num}
        </Typography>
        <Typography variant='body1'>
            ポイント: {data.point}
        </Typography>
        <Typography variant='body1'>
            作成者: {data.creater_name}
        </Typography>
    </>
}