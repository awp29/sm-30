import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="instructions" element={<h1>CUNT</h1>} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
