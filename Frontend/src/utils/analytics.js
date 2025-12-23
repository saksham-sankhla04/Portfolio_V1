const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://portfolio-backend-9r2f.onrender.com");

/**
 * Track page views
 * @param {string} page - Page path (e.g., '/home', '/about')
 */
export const trackPageView = (page) => {
  fetch(`${BACKEND_URL}/metrics/frontend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "pageview", page }),
  }).catch(() => {
    // Silently fail - don't break the app if metrics fail
  });
};

/**
 * Track frontend errors
 * @param {Error} error - Error object
 * @param {string} page - Page where error occurred
 */
export const trackError = (error, page) => {
  fetch(`${BACKEND_URL}/metrics/frontend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "error",
      page,
      message: error?.message || "Unknown error",
    }),
  }).catch(() => {});
};

/**
 * Track Web Vitals metrics
 * @param {string} metric - Metric name (LCP, FID, CLS, FCP, TTFB)
 * @param {number} value - Metric value in seconds
 */
export const trackWebVital = (metric, value) => {
  fetch(`${BACKEND_URL}/metrics/frontend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "webvital",
      page: window.location.pathname,
      metric,
      value,
    }),
  }).catch(() => {});
};

/**
 * Initialize global error tracking
 */
export const initErrorTracking = () => {
  window.onerror = (message, source, lineno, colno, error) => {
    trackError(error || { message }, window.location.pathname);
  };

  window.onunhandledrejection = (event) => {
    trackError(
      { message: event.reason?.message || "Unhandled Promise rejection" },
      window.location.pathname
    );
  };
};
