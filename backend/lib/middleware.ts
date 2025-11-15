import { verifyToken } from "./auth";
import { prisma } from "./prisma";

export async function authenticateUser(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Unauthorized", status: 401 };
  }

  const token = authHeader.substring(7);
  const decoded = verifyToken(token);

  if (!decoded) {
    return { error: "Invalid token", status: 401 };
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: { id: true, email: true, name: true, role: true },
  });

  if (!user) {
    return { error: "User not found", status: 404 };
  }

  return { user };
}

export async function requireAdmin(request: Request) {
  const auth = await authenticateUser(request);

  if ("error" in auth) {
    return auth;
  }

  if (auth.user.role !== "ADMIN") {
    return { error: "Forbidden - Admin access required", status: 403 };
  }

  return { user: auth.user };
}
