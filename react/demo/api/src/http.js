/** Small helpers for JSON/HTML responses and CORS (browser apps need the headers). */

export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

export function html(content) {
  return new Response(content, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
