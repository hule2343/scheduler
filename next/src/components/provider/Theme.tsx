'use client'
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme({
    components: {
        //`MuiCssBaseline`になっているが`CssBaseLine`ても同様に作用した
        MuiCssBaseline: {
            styleOverrides: `
            ::-webkit-scrollbar{
                width: 5px;
            },
            ::-webkit-scrollbar-thumb {
                background-color: #276976;
                border-radius: 5px;
                width: 5px;
            }
            `
        },
    },
});

export const Theme = ({ children }: { children: ReactNode }) => {
    return <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>
}
