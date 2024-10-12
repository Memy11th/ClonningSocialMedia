'use client'
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import { Store } from "@/lib/Store";
import Navbar from "./_Components/Navbar/page";
import {  ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { Box } from "@mui/material";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <Provider store={Store}>
        <ThemeProvider theme={theme}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>

        <Navbar/>
        
        <Box sx={{marginTop:'20px'}}>
        {children}
        </Box>
        
      </body>
      </ThemeProvider>
      </Provider>
    </html>
  );
}
