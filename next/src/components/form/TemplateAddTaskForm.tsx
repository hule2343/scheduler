import { Box } from "@mui/system";
import { TemplateAddTaskFields } from "./TemplateAddFields";
import { TemplateTask } from "@/types/ResponseType";
import { useState } from "react";

export const TemplateAddTaskForm = ({
  handleSubmit,
  defaultTemplateTask,
}: {
  handleSubmit: (task_id: string, formData: FormData) => void;
  defaultTemplateTask: TemplateTask;
}) => {
  const [task_id, setTaskId] = useState<string>("");
  const handleTaskSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(task_id, new FormData(event.currentTarget));
  };
  const taskData = {
    tasks: [
      {
        id: "1",
        name: "task1",
        detail: "test",
        max_worker_num: 1,
        min_worker_num: 1,
        exp_worker_num: 1,
        point: 1,
        creater_id: "1",
        creater_name: "test",
        group_id: "1",
      },
      {
        id: "2",
        name: "task2",
        detail: "test",
        max_worker_num: 1,
        min_worker_num: 1,
        exp_worker_num: 1,
        point: 1,
        creater_id: "1",
        creater_name: "test",
        group_id: "1",
      },
      {
        id: "3",
        name: "task3",
        detail: "test",
        max_worker_num: 1,
        min_worker_num: 1,
        exp_worker_num: 1,
        point: 1,
        creater_id: "1",
        creater_name: "test",
        group_id: "1",
      },
    ],
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleTaskSubmit}
      sx={{ mt: 3 }}
      maxWidth={500}
    >
      <TemplateAddTaskFields
        buttonLabel="保存"
        templateTask={defaultTemplateTask}
        tasks={taskData.tasks}
        task_id={task_id}
        setTaskId={setTaskId}
      />
    </Box>
  );
};
