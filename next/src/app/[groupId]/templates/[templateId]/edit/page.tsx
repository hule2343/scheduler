"use client";
import { fetcher } from "@/axios";
import useSWR from "swr";
import {
  TemplateResponse,
  TemplateTask,
  TemplateTaskResponse,
} from "@/types/ResponseType";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";
import SelectField from "@/components/form/SelectField";
import { TemplateAddTaskFields } from "@/components/form/TemplateAddFields";
import { TemplateAddTaskForm } from "@/components/form/TemplateAddTaskForm";
import { TemplateNameForm } from "@/components/form/TemplateNameForm";

export default function TemplateEdit({
  params,
}: {
  params: { groupId: string; templateId: string };
}) {
  /*const { data, error, isLoading } = useSWR<TemplateResponse>(
    `/${params.groupId}/templates/${params.templateId}`,
    fetcher
  );
  
  if (error) return <div>error</div>;
  if (!data) return <div>no data</div>;
  if (isLoading) return <div>loading...</div>;
  */

  const data: TemplateResponse = {
    id: "1",
    name: "template1",
    group_id: "1",
    slots: [
      {
        id: "1",
        date_from_start: 1,
        start_time: "10:00",
        end_time: "12:00",
        task_id: "1",
        name: "task1",
      },
      {
        id: "2",
        date_from_start: 1,
        start_time: "13:00",
        end_time: "15:00",
        task_id: "2",
        name: "task2",
      },
      {
        id: "3",
        date_from_start: 2,
        start_time: "10:00",
        end_time: "12:00",
        task_id: "3",
        name: "task3",
      },
    ],
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
  const [selectTemplateTaskId, setSelectTemplateTask] = React.useState("");
  const [editMode, setEditMode] = React.useState(false);

  const handleTaskRemove = (templateTaskId: string) => {
    axios
      .delete(
        `/${params.groupId}/templates/${params.templateId}/tasks/${templateTaskId}`
      )
      .then((response) => {})
      .catch((err) => {});
  };

  const handleTaskAdd = (task_id: string, formData: FormData) => {
    axios
      .post(`/${params.groupId}/templates/${params.templateId}/tasks`, {
        date_from_start: Number(formData.get("date_from_start")) - 1,
        start_time: formData.get("start_time") as string,
        end_time: formData.get("end_time") as string,
        id: task_id,
      })
      .then((response) => {})
      .catch((err) => {});
  };

  const handleTaskSubmit = (task_id: string, formData: FormData) => {
    axios
      .patch(
        `/${params.groupId}/templates/${params.templateId}/tasks/${selectTemplateTaskId}`,
        {
          id: task_id,
          date_from_start: Number(formData.get("date_from_start")) - 1,
          start_time: formData.get("start_time") as string,
          end_time: formData.get("end_time") as string,
        }
      )
      .then((response) => {})
      .catch((err) => {});
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        テンプレートを新規作成
      </Typography>
      <TemplateNameForm
        groupId={params.groupId}
        templateId={params.templateId}
        defaultName={data.name}
      />
      {editMode ? (
        <>
          {" "}
          <TemplateAddTaskForm
            handleSubmit={handleTaskSubmit}
            defaultTemplateTask={
              data.slots.find(
                (slot) => slot.id === selectTemplateTaskId
              ) as TemplateTaskResponse
            }
          />
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleTaskRemove(selectTemplateTaskId)}
          >
            削除
          </Button>
        </>
      ) : (
        <TemplateAddTaskForm
          handleSubmit={handleTaskAdd}
          defaultTemplateTask={{
            id: "",
            name: "",
            date_from_start: 0,
            start_time: "08:00",
            end_time: "08:00",
          }}
        />
      )}
      <Grid container spacing={2}>
        {new Array(
          data.slots.length > 0
            ? data.slots
                .map((task) => task.date_from_start)
                .reduce((a, b) => Math.max(a, b)) + 1
            : 0
        )
          .fill(0)
          .map((_, i) => (
            <Grid item xs={12} key={i}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  {i + 1}日目
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>名前</TableCell>
                      <TableCell>開始時刻</TableCell>
                      <TableCell>終了時刻</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.slots
                      .filter((slot) => slot.date_from_start === i)
                      .map((slot, index) => (
                        <TableRow
                          key={index}
                          onClick={() => {
                            setSelectTemplateTask(slot.id);
                          }}
                        >
                          <TableCell>{slot.name}</TableCell>
                          <TableCell>{slot.start_time}</TableCell>
                          <TableCell>{slot.end_time}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
