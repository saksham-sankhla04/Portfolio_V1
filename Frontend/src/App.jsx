import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Home from "./pages/Home";
import { trackPageView, initErrorTracking } from "./utils/analytics";

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // Initialize error tracking on app mount
    initErrorTracking();
  }, []);

  useEffect(() => {
    // Track page views on route change
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
