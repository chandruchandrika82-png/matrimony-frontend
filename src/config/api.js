const configuredApiUrl = process.env.REACT_APP_API_URL;
const defaultApiUrl = process.env.NODE_ENV === "production"
  ? "https://matrimony-backend-1-ri82.onrender.com/api"
  : "http://localhost:5000/api";

export const API = (
  configuredApiUrl || defaultApiUrl
).replace(/\/$/, "");

export const API_ORIGIN = API.replace(/\/api$/, "");

export function resolveMediaUrl(value) {
  if (!value) return "";
  if (value.startsWith("http")) return value;

  return `${API_ORIGIN}${value.startsWith("/") ? "" : "/"}${value}`;
}
