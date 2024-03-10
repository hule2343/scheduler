import axios from "@/axios";
import { Fetcher } from "swr";
export type ListProps = {
  url: string;
};
export type ResponseBase = {
  id: string;
  name: string;
};

export type GroupResponse = ResponseBase &{
  role:"super"|"normal"|"pending"
}

export type UserResponse = ResponseBase & {
  block: string;
  room_number: string;
  exp_task: TaskResponse[];
  slots: ResponseBase[];
  create_slot: ResponseBase[];
  create_task: ResponseBase[];
  point: number;
  bid: ResponseBase[];
  is_active: boolean;
};



export type TaskResponse = ResponseBase & {
  detail: string;
  max_worker_num: number;
  min_worker_num: number;
  exp_worker_num: number;
  start_point: number;
  buyout_point: number;
  creater_id: string;
  creater: string;
};

export type SlotResponse = ResponseBase & {
  start_time: string;
  end_time: string;
  creater_id: string;
  creater_name:string ;
  assignees: ResponseBase[];
  task_id: string;
  task_name: string;
};

export type TaskTagsResponse = {
  id: string;
  name: string;
};

export type AuthorityResponse = {
  id: string;
  name: string;
  url: string;
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
};

export type TemplateResponse = {
  id: string;
  name: string;
  slots: SlotResponse[];
};
export const fetcher = (url: string) => {
  return axios.get(url).then((response) => response.data);
};
