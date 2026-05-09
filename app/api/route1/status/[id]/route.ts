import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return Response.json({
    ok: true,
    id,
    status: "pending",
  });
}