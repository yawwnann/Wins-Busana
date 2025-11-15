import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/middleware";
import { getCorsHeaders, handleCorsPreFlight } from "@/lib/cors";

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return handleCorsPreFlight(origin);
}

export async function POST(request: Request) {
  const corsHeaders = getCorsHeaders(request);
  const auth = await requireAdmin(request);
  if ("error" in auth) {
    return NextResponse.json({ message: auth.error }, { status: auth.status, headers: corsHeaders });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400, headers: corsHeaders },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "umkm-products",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    return NextResponse.json({
      url: (result as { secure_url: string }).secure_url,
      publicId: (result as { public_id: string }).public_id,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Error uploading file" },
      { status: 500, headers: corsHeaders },
    );
  }
}
