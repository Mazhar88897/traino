import { BrowserRouter as Router } from "react-router-dom";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { COLORS } from "./theme";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./route";
import { globalStyle } from "./styles/globalStyle";
import { useSelector } from "react-redux";
import { selectUser } from "./store/slice/user";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  console.log("Environment Variables:", process.env);
  const theme = createTheme({
    palette: {
      primary: {
        light: COLORS.primary,
        main: COLORS.primary,
        dark: COLORS.primary,
      },
      secondary: {
        light: COLORS.secondary,
        main: COLORS.secondary,
        dark: COLORS.secondary,
      },
      black: {
        light: COLORS.black,
        main: COLORS.black,
        dark: COLORS.black,
      },
      white: {
        light: COLORS.white,
        main: COLORS.white,
        dark: COLORS.white,
      },
      golden: {
        light: COLORS.golden,
        main: COLORS.golden,
        dark: COLORS.golden,
      },
    },
  });
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Toaster position="top-center"
          theme="colored"
          toastOptions={{
            success: {
              style: {
                background: '#47B881',  // Green background for success
                color: 'white',
                borderRadius: '5px',
                boxShadow: 'none',
              },
              iconTheme: {
                primary: 'white',
                secondary: '#47B881',  // White icon with green circle
              },
            },
            error: {
              style: {
                background: '#f44336',  // Red background for error
                color: 'white',
                borderRadius: '5px',
                boxShadow: 'none',
              },
              iconTheme: {
                primary: 'white',
                secondary: '#f44336',  // White icon with red circle
              },
            },
          }}
        />
        <Box sx={globalStyle.routeWrapper}>
          <AppRoutes />
        </Box>
      </ThemeProvider>
    </Router>
  );
};

export default App;
