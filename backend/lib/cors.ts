import { NextResponse } from "next/server";

// Daftar allowed origins
const allowedOrigins = ["https://wins-busana-jogja.vercel.app", "http://localhost:5173"];

export function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin");

  // Jika origin ada dan termasuk dalam allowed origins, gunakan origin tersebut
  // Jika tidak, gunakan wildcard untuk development atau fallback ke origin pertama
  const allowedOrigin =
    origin && allowedOrigins.includes(origin) ? origin : "*";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials":
      allowedOrigin !== "*" ? "true" : "false",
  };
}

export function setCorsHeaders(response: NextResponse, origin?: string | null) {
  // Cek apakah origin ada dalam daftar allowed origins
  const allowedOrigin =
    origin && allowedOrigins.includes(origin) ? origin : "*";

  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
  response.headers.set(
    "Access-Control-Allow-Credentials",
    allowedOrigin !== "*" ? "true" : "false",
  );
  return response;
}

export function handleCorsPreFlight(origin?: string | null) {
  const response = NextResponse.json({}, { status: 200 });
  return setCorsHeaders(response, origin);
}
