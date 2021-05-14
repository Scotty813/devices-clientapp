import {
  ThemeProvider as MuiProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import { DeviceProvider } from "./context/DeviceContext";
import { DialogProvider } from "./context/DialogContext";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    type: "dark",
  },
});

ReactDOM.render(
  <MuiProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DeviceProvider>
        <DialogProvider>
          <App />
        </DialogProvider>
      </DeviceProvider>
    </ThemeProvider>
  </MuiProvider>,
  document.getElementById("root")
);
