export type ListProps = {
  url: string;
};
export type ResponseBase = {
  id: string;
  name: string;
};

export type GroupResponse = ResponseBase & {
  role: "super" | "normal" | "pending";
};

export type GroupUserResponse = GroupResponse & {
  room_number: string;
  point: number;
  is_active: boolean;
};

export type GroupUsersResponse = {
  users: GroupUserResponse[];
};

export type UserResponse = ResponseBase & {
  room_number: string;
  is_active: boolean;
};

export type UserDetailResponse = ResponseBase & {
  room_number: string;
  groups: ResponseBase[];
  exp_tasks: ResponseBase[];
  slots: ResponseBase[];
  create_slots: ResponseBase[];
  create_tasks: ResponseBase[];
  is_active: boolean;
  is_admin: boolean;
};

export type TaskResponse = ResponseBase & {
  detail: string;
  max_worker_num: number;
  min_worker_num: number;
  exp_worker_num: number;
  point: number;
  creater_id: string;
  creater_name: string;
  group_id: string;
};

export type TasksResponse = {
  tasks: TaskResponse[];
};

export type SlotResponse = ResponseBase & {
  start_time: string;
  end_time: string;
  creater_id: string;
  creater_name: string;
  assignees: ResponseBase[];
  task_id: string;
  task_name: string;
};

export type TemplateTask = ResponseBase & {
  date_from_start: number;
  start_time: string;
  end_time: string;
};

export type TemplateTaskResponse = TemplateTask & {
  task_id: string;
};

export type TemplateResponse = ResponseBase & {
  group_id: string;
  slots: TemplateTaskResponse[];
};
