import { onCLS, onINP, onLCP, onTTFB } from "web-vitals";
import type { Metric } from "web-vitals";

type VitalMetric = "LCP" | "INP" | "CLS" | "TTFB";

function getDevice(): "mobile" | "desktop" {
  return matchMedia("(pointer: coarse)").matches ? "mobile" : "desktop";
}

function sendVital(name: VitalMetric, metric: Metric) {
  const body = JSON.stringify({
    metric: name,
    value: metric.value,
    path: location.pathname,
    device: getDevice(),
  });

  const url = "/api/vitals";

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon(url, blob);
    return;
  }

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export function reportWebVitals() {
  if (!import.meta.env.PROD) return;

  onLCP((metric) => sendVital("LCP", metric));
  onINP((metric) => sendVital("INP", metric));
  onCLS((metric) => sendVital("CLS", metric));
  onTTFB((metric) => sendVital("TTFB", metric));
}
