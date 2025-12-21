import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "./pages/Home";

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
