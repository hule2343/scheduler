import { RoleResponse, permissions } from "@/types/ResponseType";
import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const RoleForm = ({ data }: { data: { name: string } }) => {
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
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="グループへのユーザーの追加"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="グループのユーザーの削除"
          />
          <FormControlLabel control={<Checkbox />} label="タスクの編集" />
          <FormControlLabel control={<Checkbox />} label="テンプレートの編集" />
          <FormControlLabel control={<Checkbox />} label="ロールの編集" />
          <FormControlLabel
            control={<Checkbox />}
            label="ユーザーのロールの変更"
          />
          <FormControlLabel control={<Checkbox />} label="仕事の編集" />
          <FormControlLabel
            control={<Checkbox />}
            label="テンプレートから募集"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="ユーザーのポイントの変更"
          />
        </FormGroup>
      </Grid>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        保存
      </Button>
    </Grid>
  );
};
