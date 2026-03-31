import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import { images } from "./assets/images.js";

createRoot(document.getElementById("root")).render(<App />);
