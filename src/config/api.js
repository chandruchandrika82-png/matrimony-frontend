const configuredApiUrl = process.env.REACT_APP_API_URL;

export const API = (configuredApiUrl || "http://localhost:5000/api").replace(/\/$/, "");

export const API_ORIGIN = API.replace(/\/api$/, "");

export function resolveMediaUrl(value) {
  if (!value) return "";
  if (value.startsWith("http")) return value;

  return `${API_ORIGIN}${value.startsWith("/") ? "" : "/"}${value}`;
}