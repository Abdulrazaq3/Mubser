// src/config.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  'https://pattae-melissa-nondoubtingly.ngrok-free.dev'; // fallback
export const ANALYZE_ENDPOINT = `${API_BASE}/analyze`;
export const SEND_FIELD_NAME = 'image'; // لازم يطابق FastAPI: image: UploadFile = File(...)
export const DEFAULT_INTERVAL_MS = 2000;
