import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AppContext from "./utiles/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AppContext>
    <App />
  </AppContext>
);
