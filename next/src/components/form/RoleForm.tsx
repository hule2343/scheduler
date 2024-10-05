import { Permission, RoleResponse } from "@/types/ResponseType";
import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Dispatch, SetStateAction } from "react";

export const RoleForm = ({
  name,
  permissions,
  setPermissions,
}: {
  name: string;
  permissions: Permission[];
  setPermissions: Dispatch<SetStateAction<Permission[]>>;
}) => {
  const onChecked = (value: Permission) => {
    if (permissions.some((permission) => permission === value)) {
      setPermissions(permissions.filter((permission) => permission !== value));
    } else {
      setPermissions([...permissions, value]);
    }
  };
  const RoleCheckbox = ({ permission }: { permission: Permission }) => {
    return (
      <Checkbox
        value={permission}
        checked={permissions.some(
          (defaultPermission) => defaultPermission === permission
        )}
        onChange={() => onChecked(permission)}
      />
    );
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
          defaultValue={name}
        />
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <FormControlLabel
            control={<RoleCheckbox permission="add_user" />}
            label="グループへのユーザーの追加"
          />
          <FormControlLabel
            control={<RoleCheckbox permission="remove_user" />}
            label="グループのユーザーの削除"
          />
          <FormControlLabel
            control={<RoleCheckbox permission="edit_task" />}
            label="タスクの編集"
          />
          <FormControlLabel
            control={<RoleCheckbox permission="edit_template" />}
            label="テンプレートの編集"
          />
          <FormControlLabel
            control={<RoleCheckbox permission="edit_role" />}
            label="ロールの編集"
          />
          <FormControlLabel
            control={<RoleCheckbox permission="change_user_role" />}
            label="ユーザーのロールの変更"
          />
          <FormControlLabel
            control={<RoleCheckbox permission="edit_slot" />}
            label="仕事の編集"
          />
          <FormControlLabel
            control={<RoleCheckbox permission="add_slot_from_template" />}
            label="テンプレートから募集"
          />
          <FormControlLabel
            control={<RoleCheckbox permission="edit_point" />}
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
