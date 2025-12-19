import { NextResponse } from "next/server";

export function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin");

  // Allowed origins
  const allowedOrigins = [
    "https://wins-busana-jogja.netlify.app",
    "http://localhost:5173",
    "http://localhost:3000",
  ];

  const isAllowedOrigin = origin && allowedOrigins.includes(origin);
  const allowedOrigin = isAllowedOrigin ? origin : allowedOrigins[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

export function setCorsHeaders(response: NextResponse, origin?: string | null) {
  const allowedOrigins = [
    "https://wins-busana-jogja.netlify.app",
    "http://localhost:5173",
    "http://localhost:3000",
  ];

  const isAllowedOrigin = origin && allowedOrigins.includes(origin);
  const allowedOrigin = isAllowedOrigin ? origin : allowedOrigins[0];

  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export function handleCorsPreFlight(origin?: string | null) {
  const response = NextResponse.json({}, { status: 200 });
  return setCorsHeaders(response, origin);
}
