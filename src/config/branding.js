import { API } from "./api";
export const defaultBranding = { name: "New Varan Kongu Thirumana Matrimony", address: "Namakkal", phone: "9344973982", website: "www.newvaran.com", logo: "" };
export async function fetchBranding() { try { const response = await fetch(`${API}/branding`); if (!response.ok) throw new Error("branding unavailable"); return { ...defaultBranding, ...(await response.json()) }; } catch { return defaultBranding; } }
