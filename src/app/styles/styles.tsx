"use client"

import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../themes/default";
import { GlobalStyles } from "./global";

export default function Provider(){
  return(
    <main>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <h1>Hellor World</h1>
      </ThemeProvider>
    </main>
  );
}