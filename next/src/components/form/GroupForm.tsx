import { ResponseBase} from "@/types/ResponseType"
import { Grid } from "@mui/material"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
export const GroupForm = ({data}:{data:ResponseBase}) => {
    return (
        <Grid container spacing={2}>
                <Grid item xs={12} >
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    保存
                </Button>
            </Grid>

    )
}