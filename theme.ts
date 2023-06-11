import { createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.

export function getTheme({ enableDarkMode }: { enableDarkMode: boolean }) {
  return createTheme({
    palette: {
      mode: enableDarkMode ? "dark" : "light",
      // primary: {
      //   main: "#FF5722",
      //   contrastText: "#000",
      // },
      // background: {
      //   default: enableDarkMode ? "#303030" : "#fff",
      // },
      // secondary: {
      //   main: "#424242",
      // },
      // error: {
      //   main: "#F44336",
      // },
      // success: {
      //   main: "#4caf50",
      // },
      // warning: {
      //   main: "#ff9800",
      // },
      // info: {
      //   main: "#9C27B0",
      // },
    },
    typography: {
      fontFamily: poppins.style.fontFamily,
    },
  });
}
