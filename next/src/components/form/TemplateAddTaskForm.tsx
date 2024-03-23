"use client";
import { Box } from "@mui/system";
import { TemplateAddTaskFields } from "./TemplateAddFields";
import {  TemplateTaskResponse } from "@/types/ResponseType";
import { useEffect, useState } from "react";

export const TemplateAddTaskForm = ({
  handleSubmit,
  templateTask,
}: {
  handleSubmit: (data: TemplateTaskResponse) => void;
  templateTask: TemplateTaskResponse;
}) => {
  const [formData, setTemplateTask] = useState<TemplateTaskResponse>();
  useEffect(() => {
    setTemplateTask(templateTask);
  }, [templateTask]);
  if (!formData) {
    return null;
  }
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
      onSubmit={() => handleSubmit(formData)}
      sx={{ mt: 3 }}
      maxWidth={500}
    >
      <TemplateAddTaskFields
        buttonLabel="保存"
        templateTask={formData}
        setTemplateTask={setTemplateTask}
        tasks={taskData.tasks}
      />
    </Box>
  );
};
