"use client"

import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../themes/default";
import { GlobalStyles } from "./global";
import Login from "@/components/login";

export default function Provider(){
  return(
    <main>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Login />
      </ThemeProvider>
    </main>
  );
}