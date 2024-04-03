import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "materialize-css/dist/css/materialize.min.css";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";
import { AuthContextProvider } from "./context/AuthConext";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "./components/ThemeContext";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <ThemeProvider>
        <Provider store={store}>
          <ScrollToTop />
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
