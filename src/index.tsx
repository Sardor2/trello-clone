import { render } from "react-dom";
import App from "./app/App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./app/theme";
import "./styles.css"

const rootElement = document.getElementById("root");

const app = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);

render(app, rootElement);
