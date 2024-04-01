import { ResponseBase, SlotResponse, TaskResponse } from "@/types/ResponseType";
import { fetcher } from "@/axios";
import { Typography } from "@mui/material";
import useSWR from "swr";
export default function TaskDetail({
  params,
}: {
  params: { groupId: string; taskId: string };
}) {
  const { data, error, isLoading } = useSWR<TaskResponse>(
    `/${params.groupId}/slots/${params.taskId}`,
    fetcher
  );

  if (error) return <div>error</div>;
  if (!data) return <div>no data</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Typography variant="h4" component="div">
        {data.name}
      </Typography>
      <Typography variant="body1">仕事内容：{data.detail}</Typography>
      <Typography variant="body1">
        最大参加者数: {data.max_worker_num}
      </Typography>
      <Typography variant="body1">
        最低参加者数: {data.min_worker_num}
      </Typography>
      <Typography variant="body1">
        最低経験者数: {data.exp_worker_num}
      </Typography>
      <Typography variant="body1">ポイント: {data.point}</Typography>
      <Typography variant="body1">作成者: {data.creater_name}</Typography>
    </>
  );
}
