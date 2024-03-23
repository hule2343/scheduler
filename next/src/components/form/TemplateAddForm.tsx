import { Button, Grid, TextField } from "@mui/material";
import SelectField from "./SelectField";
import { ResponseBase, TemplateTask } from "@/types/ResponseType";

export const TemplateAddTaskForm = ({
  templateTask,
  buttonLabel,
  tasks,
  task_id,
  setTaskId,
}: {
  templateTask: TemplateTask;
  buttonLabel: string;
  tasks: ResponseBase[];
  task_id: string;
  setTaskId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="date_from_start"
          label="何日目"
          name="date_from_start"
          type="number"
          inputProps={{ min: 1, max: 100, step: 1 }}
          defaultValue={templateTask.date_from_start+1}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          id="start_time"
          label="開始時刻"
          name="start_time"
          type="time"
          defaultValue={templateTask.start_time}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          id="end_time"
          label="終了時刻"
          name="end_time"
          type="time"
          defaultValue={templateTask.end_time}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectField
          data={tasks}
          title="仕事内容"
          id={task_id}
          setData={setTaskId}
        />
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        {buttonLabel}
      </Button>
    </Grid>
  );
};
