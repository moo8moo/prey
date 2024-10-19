import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* استخدم BrowserRouter مع basename لتحديد المسار الجذري عند نشر المشروع */}
    <BrowserRouter basename="/prey/"> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
