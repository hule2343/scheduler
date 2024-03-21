import { fetcher } from "@/axios";
import useSWR from "swr";
import { TemplateResponse } from "@/types/ResponseType";
import {
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

export default function TemplateDetail({
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
  const data = {
    name: "template1",
    slots: [
      {
        id: "1",
        name: "slot1",
        start_time: "2022-10-10T10:00",
        end_time: "2022-10-10T12:00",
        date_from_start: 1,
      },
      {
        id: "1",
        name: "slot1",
        start_time: "2022-10-10T10:00",
        end_time: "2022-10-10T12:00",
        date_from_start: 1,
      },
      {
        id: "1",
        name: "slot1",
        start_time: "2022-10-10T10:00",
        end_time: "2022-10-10T12:00",
        date_from_start: 1,
      },
      {
        id: "1",
        name: "slot1",
        start_time: "2022-10-10T10:00",
        end_time: "2022-10-10T12:00",
        date_from_start: 1,
      },
      {
        id: "1",
        name: "slot1",
        start_time: "2022-10-10T10:00",
        end_time: "2022-10-10T12:00",
        date_from_start: 1,
      },
      {
        id: "1",
        name: "slot1",
        start_time: "2022-10-10T10:00",
        end_time: "2022-10-10T12:00",
        date_from_start: 1,
      },
      {
        id: "1",
        name: "slot1",
        start_time: "2022-10-10T10:00",
        end_time: "2022-10-10T12:00",
        date_from_start: 1,
      },
      {
        id: "1",
        name: "slot1",
        start_time: "2022-10-10T10:00",
        end_time: "2022-10-10T12:00",
        date_from_start: 1,
      },
      {
        id: "2",
        name: "slot2",
        start_time: "2022-10-10T10:00",
        end_time: "2022-10-10T12:00",
        date_from_start: 2,
      },
      {
        id: "3",
        name: "slot3",
        start_time: "2022-10-10T10:00",
        end_time: "2022-10-10T12:00",
        date_from_start: 3,
      },
    ],
  };

  const last_date = data.slots
    .map((slot) => slot.date_from_start)
    .reduce((a, b) => Math.max(a, b)); // => 10
  console.log(last_date);

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        {data.name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Link
            href={`${params.groupId}/templates/${params.templateId}/generate`}
          >
            シフトを募集
          </Link>
        </Grid>
        <Grid item xs={3}>
          <Link href={`${params.groupId}/templates/${params.templateId}/edit`}>
            編集
          </Link>
        </Grid>
        <Grid item xs={3}>
          <Link
            href={`${params.groupId}/templates/${params.templateId}/delete`}
          >
            削除
          </Link>
        </Grid>{" "}
        {new Array(last_date).fill(0).map((_, i) => (
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
                    .map((slot) => (
                      <TableRow key={slot.id}>
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
