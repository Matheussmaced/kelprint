"use client"

import EditClientComponent from "@/components/editClientComponent/index"
import { GlobalStyles } from "@/styles/global"
import { defaultTheme } from "@/themes/default"
import { useParams } from "next/navigation"
import { ThemeProvider } from "styled-components"

export default function EditClient( { jsonData } : any ) {
  const params = useParams();
  const clientId = params.id;

  return (
    <ThemeProvider theme={ defaultTheme }>
       <GlobalStyles />
      <>
        <EditClientComponent idClient={clientId} />
      </>
    </ThemeProvider>
   
  )
}