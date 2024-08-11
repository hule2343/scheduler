import { SlotResponse } from "@/types/ResponseType";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const toDatetimeString = (time: string) => {
  return new Date(time).toLocaleString("ja-JP", {
    month: "2-digit",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const toDateString = (time: string) => {
  return new Date(time).toLocaleDateString("ja-JP", {
    month: "2-digit",
    day: "numeric",
  });
};

const toTimeString = (time: string) => {
  return new Date(time).toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
export const SlotDisplayCardBase = ({
  slot,
  children,
  style,
}: {
  slot: SlotResponse;
  children: React.ReactNode;
  style: React.CSSProperties;
}) => {
  const startTimeString = toTimeString(slot.start_time);
  const endTimeString = toTimeString(slot.end_time);
  const dateString = toDateString(slot.start_time);
  const assignees = slot.assignees.map((assignee) => assignee.name).join(", ");
  return (
    <Card sx={{ minWidth: 240 }} variant="outlined" style={style}>
      <CardContent>
        <Typography variant="h5" component="div">
          {slot.name}
        </Typography>
        <Typography variant="body1">
          {dateString}: {startTimeString} 〜{endTimeString}
        </Typography>
        <Typography variant="body2">参加者:{assignees}</Typography>
      </CardContent>
      <CardActions>{children}</CardActions>
    </Card>
  );
};
