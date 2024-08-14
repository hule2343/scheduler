import { Permission, RoleResponse, permissions } from "@/types/ResponseType";
import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Dispatch, SetStateAction } from "react";

export const RoleForm = ({
  data,
  permissions,
  setPermissions,
}: {
  data: { name: string };
  permissions: Permission[];
  setPermissions: Dispatch<SetStateAction<Permission[]>>;
}) => {
  const onChecked = (value: Permission) => {
    if (permissions.some(value)) {
      setPermissions(permissions.filter((permission) => permission !== value));
    } else {
      setPermissions([...permissions, value]);
    }
  };
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
            control={
              <Checkbox
                value="add_user"
                onChange={() => onChecked("add_user")}
              />
            }
            label="グループへのユーザーの追加"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remove_user"
                onChange={() => onChecked("remove_user")}
              />
            }
            label="グループのユーザーの削除"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="edit_task"
                onChange={() => onChecked("edit_task")}
              />
            }
            label="タスクの編集"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="edit_template"
                onChange={() => onChecked("edit_template")}
              />
            }
            label="テンプレートの編集"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="edit_role"
                onChange={() => onChecked("edit_role")}
              />
            }
            label="ロールの編集"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="change_user_role"
                onChange={() => onChecked("change_user_role")}
              />
            }
            label="ユーザーのロールの変更"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="edit_slot"
                onChange={() => onChecked("edit_slot")}
              />
            }
            label="仕事の編集"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="add_slot_from_template"
                onChange={() => onChecked("add_slot_from_template")}
              />
            }
            label="テンプレートから募集"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="edit_point"
                onChange={() => onChecked("edit_point")}
              />
            }
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
