import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { Providers } from "./providers";

export default function App() {
  return (
    <Router
      root={(props) => (
        <Suspense>
          <Providers>{props.children}</Providers>
        </Suspense>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
