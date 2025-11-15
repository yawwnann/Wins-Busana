import { NextResponse } from "next/server";

// Daftar allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://winsbusana-be.netlify.app",
  "https://winsbusana.netlify.app",
  "https://wins-busana.vercel.app", // Frontend di Vercel
  "https://wins-busana-jogja.vercel.app/", // Backend di Vercel (jika berbeda)
];

export function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin");
  const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

export function setCorsHeaders(response: NextResponse, origin?: string | null) {
  // Cek apakah origin ada dalam daftar allowed origins
  const allowedOrigin = origin && allowedOrigins.includes(origin) 
    ? origin 
    : allowedOrigins[0];
  
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
