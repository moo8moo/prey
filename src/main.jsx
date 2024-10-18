import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; // استيراد BrowserRouter
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/prey/"> {/* إضافة BrowserRouter مع basename هنا */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);