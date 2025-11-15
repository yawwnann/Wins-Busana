import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, comparePassword, generateToken } from "@/lib/auth";
import { handleCorsPreFlight, getCorsHeaders } from "@/lib/cors";

// Handle OPTIONS for CORS preflight
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return handleCorsPreFlight(origin);
}

export async function POST(req: Request) {
  const corsHeaders = getCorsHeaders(req);
  const body = await req.json();
  const { email, password, name, type } = body;

  if (type === "register") {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json(
        { message: "User exists" },
        { status: 400, headers: corsHeaders }
      );

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashed, name },
    });
    const token = generateToken(user.id);
    return NextResponse.json({ token }, { headers: corsHeaders });
  }

  if (type === "login") {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json(
        { message: "Not found" },
        { status: 404, headers: corsHeaders }
      );

    const match = await comparePassword(password, user.password);
    if (!match)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401, headers: corsHeaders },
      );

    const token = generateToken(user.id);
    return NextResponse.json({ token }, { headers: corsHeaders });
  }

  return NextResponse.json(
    { message: "Invalid request" },
    { status: 400, headers: corsHeaders }
  );
}
