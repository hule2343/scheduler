"use client";
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
            `,
    },
  },
  typography: {
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,

    h1: { fontSize: 60 },
    h2: { fontSize: 48 },
    h3: { fontSize: 42 },
    h4: { fontSize: 36 },
    h5: { fontSize: 20 },
    h6: { fontSize: 10 },
    subtitle1: { fontSize: 12 },
    body1: { fontSize: 12 },
    body2:{fontSize:8},
    button: { textTransform: "none" },
  },
});

export const Theme = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
