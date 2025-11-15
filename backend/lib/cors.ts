import { NextResponse } from "next/server";

export function setCorsHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "http://localhost:5173");
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

export function handleCorsPreFlight() {
  const response = NextResponse.json({}, { status: 200 });
  return setCorsHeaders(response);
}
