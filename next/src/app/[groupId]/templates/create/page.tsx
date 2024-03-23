"use client";
import { fetcher } from "@/axios";
import useSWR from "swr";
import { TemplateResponse, TemplateTask } from "@/types/ResponseType";
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
import { TemplateAddTaskForm } from "@/components/form/TemplateAddForm";
export default function TemplateCreate({
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

  const [data, setTasks] = React.useState<TemplateTask[]>([]);
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
  const [name, setName] = React.useState("");
  const [task_id, setTaskId] = React.useState("1");

  const handleTaskRemove = (slot: TemplateTask) => {
    setTasks(data.filter((s) => s !== slot));
  };

  const handleTaskAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form_data = new FormData(event.currentTarget);
    const task = {
      id: task_id,
      name: taskData.tasks.find((task) => task.id === task_id)?.name as string,
      date_from_start: Number(form_data.get("date_from_start")) - 1,
      start_time: form_data.get("start_time") as string,
      end_time: form_data.get("end_time") as string,
    };
    setTasks([...data, task]);
  };
  const handleSubmit = () => {
    axios
      .post(`/${params.groupId}/templates`, {
        name: name,
        tasks: data.map((task) => {
          return {
            id: task.id,
            date_from_start: task.date_from_start,
            start_time: task.start_time,
            end_time: task.end_time,
          };
        }),
      })
      .then((response) => {})
      .catch((err) => {});
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        テンプレートを新規作成
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          id="template_name"
          label="テンプレート名"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
      </Box>
      <Box
        component="form"
        noValidate
        onSubmit={handleTaskAdd}
        sx={{ mt: 3 }}
        maxWidth={500}
      >
        <TemplateAddTaskForm
          templateTask={{
            id: "None",
            name: "None",
            date_from_start: 0,
            start_time: "08:00",
            end_time: "08:00",
          }}
          buttonLabel="追加"
          tasks={taskData.tasks.map((task) => {
            return { id: task.id, name: task.name };
          })}
          task_id={task_id}
          setTaskId={setTaskId}
        />
        <Button fullWidth variant="contained" onClick={() => handleSubmit}>
          作成
        </Button>
      </Box>
      <Grid container spacing={2}>
        {new Array(
          data.length > 0
            ? data
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
                    {data
                      .filter((slot) => slot.date_from_start === i)
                      .map((slot, index) => (
                        <TableRow key={index}>
                          <TableCell>{slot.name}</TableCell>
                          <TableCell>{slot.start_time}</TableCell>
                          <TableCell>{slot.end_time}</TableCell>
                          <TableCell>
                            <Button onClick={() => handleTaskRemove(slot)}>
                              削除
                            </Button>
                          </TableCell>
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
