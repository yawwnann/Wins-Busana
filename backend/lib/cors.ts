import { NextResponse } from "next/server";

export function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin");
  
  // Untuk development, izinkan semua localhost
  const allowedOrigin = origin || "*";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "false",
  };
}

export function setCorsHeaders(response: NextResponse, origin?: string | null) {
  const allowedOrigin = origin || "*";

  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
  response.headers.set("Access-Control-Allow-Credentials", "false");
  return response;
}

export function handleCorsPreFlight(origin?: string | null) {
  const response = NextResponse.json({}, { status: 200 });
  return setCorsHeaders(response, origin);
}
