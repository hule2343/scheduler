import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ResponseBase } from "@/types/ResponseType";
type SingleChoiceFieldProps = {
    data: ResponseBase[];
    title: string;
    id: string;
    setData: React.Dispatch<React.SetStateAction<string>>;
};

export default function SelectField(
    props: SingleChoiceFieldProps
) {
    const [id, setData] = [props.id, props.setData];
    const handleChange = (event: SelectChangeEvent) => {
        setData(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id={`${props.title}`}>
                    {props.title}
                </InputLabel>
                <Select
                    labelId={`${props.title}`}
                    id={`${props.title}`}
                    value={id}
                    label={props.title}
                    onChange={handleChange}
                >
                    {props.data.map((data) => (
                        <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
