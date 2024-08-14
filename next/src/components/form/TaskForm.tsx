import { TaskResponse } from "@/types/ResponseType";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const TaskForm = ({ data }: { data: TaskResponse }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          autoComplete="given-name"
          name="name"
          required
          id="name"
          label="名前"
          autoFocus
          defaultValue={data.name}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          required
          id="detail"
          label="詳細"
          name="detail"
          rows={15}
          maxRows={18}
          inputProps={{ maxLength: 400 }}
          defaultValue={data.detail}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="max_worker_num"
          label="最大参加者数"
          name="max_worker_num"
          type="number"
          inputProps={{ min: 1, max: 100, step: 1 }}
          defaultValue={data.max_worker_num}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="min_worker_num"
          label="最低参加者数"
          name="min_worker_num"
          type="number"
          inputProps={{ min: 0, max: 100, step: 1 }}
          defaultValue={data.min_worker_num}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="exp_worker_num"
          label="最低経験者数"
          name="exp_worker_num"
          type="number"
          inputProps={{ min: 0, max: 100, step: 1 }}
          defaultValue={data.exp_worker_num}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="point"
          label="ポイント"
          name="point"
          type="number"
          inputProps={{ min: -100, max: 100, step: 1 }}
          defaultValue={data.point}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="duration"
          label="所要時間(分)"
          name="duration"
          type="number"
          inputProps={{ min: 0, step: 1 }}
          defaultValue={data.duration/60}
        />
      </Grid>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        保存
      </Button>
    </Grid>
  );
};
