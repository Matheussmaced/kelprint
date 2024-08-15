"use client"
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Home from "./page";

const inter = Inter({ subsets: ["latin"] });

const checkAuth = () => {
  if(localStorage.getItem("TOKEN_FRONT") != undefined) {
    return true;
  }else{
    return false;
  }
}

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(checkAuth());
    setPageLoaded(true);
  },[]);

  return (
    <html lang="en">
      {authenticated ? 
        <body className={inter.className}>{children}</body>
        :
        pageLoaded ?
        <body className={inter.className}> <Home /> </body>
        :
        null
      }
    </html>
  );
}
