import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import useSWR, { Fetcher } from "swr";
import { ResponseBase } from "@/types/ResponseType";
import { fetcher } from "@/axios";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


export function MultiSelect(
    { task, title, exp_task, setData }: {
        task: ResponseBase[];
        title: string;
        exp_task: string[];
        setData: React.Dispatch<React.SetStateAction<string[]>>;
    }
) {
    const theme = useTheme();
    const handleChange = (event: SelectChangeEvent<typeof exp_task>) => {
        const {
            target: { value },
        } = event;
        setData(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">{title}</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={exp_task}
                    onChange={handleChange}
                    input={
                        <OutlinedInput id="select-multiple-chip" label={title} />
                    }
                    renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value) => {
                                const tagname = task.find((tag) => tag.id === value)!.name;
                                return <Chip key={value} label={tagname} />;
                            })}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {task.map((tag) => (
                        <MenuItem
                            key={tag.id}
                            value={tag.id}
                            style={getStyles(tag.name, exp_task, theme)}
                        >
                            {tag.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
