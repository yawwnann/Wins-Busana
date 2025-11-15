import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Hapus user lama jika ada
  await prisma.user.deleteMany({
    where: { email: "admin@example.com" },
  });

  // Hash password
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Buat user admin
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin",
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user created:");
  console.log("Email:", admin.email);
  console.log("Password: admin123");
  console.log("Role:", admin.role);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
