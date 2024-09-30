import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const uploadUrl = await fetchMutation(api.files.generateUploadUrl, {});

    return NextResponse.json({ uploadUrl });
  } catch (error) {
    console.error("Error generating upload URL:", error);
    return NextResponse.json(
      { message: "Error generating upload URL" },
      { status: 500 }
    );
  }
}
