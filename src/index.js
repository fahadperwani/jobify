import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashBoard } from "./pages/DashBoard";
import Login from "./pages/Login";
import { PrivateRoutesLayout } from "./routes/PrivateRoutesLayout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route element={<PrivateRoutesLayout />}>
            <Route path="/" element={<DashBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
