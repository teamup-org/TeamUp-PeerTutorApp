import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./(ui)/theme";
import CssBaseline from "@mui/material/CssBaseline";

// 
export const metadata: Metadata = {
  title: "Theo Peer Tutoring",
  description: "A peer tutoring service for matching tutors with tutees",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Material UI - Proper rendering and touch zooming for all devices */}
      <head><meta name="viewport" content="initial-scale=1, width=device-width" /></head>
      
      <body>
        <ThemeProvider theme={ theme }>
          <CssBaseline />{children}
        </ThemeProvider>
      </body>
    </html>
  );
}
