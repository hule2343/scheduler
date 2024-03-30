"use client";
import { fetcher } from "@/axios";
import useSWR from "swr";
import {
  TemplateResponse,
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
  Typography,
} from "@mui/material";
import React from "react";
import axios from "axios";
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

  const [data, setData] = React.useState<TemplateResponse>({
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
  });

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
  const [selectId, setId] = React.useState<string>();

  const handleTaskRemove = (templateTaskId: string) => {
    axios
      .delete(
        `/${params.groupId}/templates/${params.templateId}/tasks/${templateTaskId}`
      )
      .then((response) => {})
      .catch((err) => {});
  };

  const handleTaskAdd = (selectTemplateTask: TemplateTaskResponse) => {
    axios
      .post(`/${params.groupId}/templates/${params.templateId}/tasks`, {
        date_from_start: Number(selectTemplateTask?.date_from_start) - 1,
        start_time: selectTemplateTask?.start_time,
        end_time: selectTemplateTask?.end_time,
        id: selectTemplateTask?.task_id,
      })
      .then((response) => {})
      .catch((err) => {});
  };

  const handleTaskSubmit = (templateTask: TemplateTaskResponse) => {
    if (!templateTask) return;
    axios
      .patch(
        `/${params.groupId}/templates/${params.templateId}/tasks/${templateTask?.id}`,
        {
          id: templateTask.task_id,
          date_from_start: Number(templateTask.date_from_start) - 1,
          start_time: templateTask.start_time,
          end_time: templateTask.end_time,
        }
      )
      .then((response) => {})
      .catch((err) => {});
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        テンプレートを編集
      </Typography>
      <TemplateNameForm
        groupId={params.groupId}
        templateId={params.templateId}
        defaultName={data.name}
      />
      {selectId ? (
        <>
          {" "}
          <TemplateAddTaskForm
            handleSubmit={handleTaskSubmit}
            templateTask={data.slots.find((slot) => selectId === slot.id)!}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleTaskRemove(selectId)}
          >
            削除
          </Button>
        </>
      ) : (
        <TemplateAddTaskForm
          handleSubmit={handleTaskAdd}
          templateTask={{
            id: "",
            date_from_start: 0,
            start_time: "08:00",
            end_time: "09:00",
            task_id: "",
            name: "",
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
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.slots
                      .filter((slot) => slot.date_from_start === i)
                      .map((slot, index) => (
                        <TableRow key={index} selected={selectId === slot.id}>
                          <TableCell>{slot.name}</TableCell>
                          <TableCell>{slot.start_time}</TableCell>
                          <TableCell>{slot.end_time}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => {
                                setId((prev) => {
                                  return slot.id;
                                });
                              }}
                            >
                              編集
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          ))}
        {selectId ? (
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setId(undefined)}
            >
              +新規追加
            </Button>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
}
