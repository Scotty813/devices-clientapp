import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  ThemeProvider as MuiProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import { DeviceProvider } from "./context/DeviceContext";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

ReactDOM.render(
  <MuiProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DeviceProvider>
        <App />
      </DeviceProvider>
    </ThemeProvider>
  </MuiProvider>,
  document.getElementById("root")
);
