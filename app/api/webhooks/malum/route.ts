import crypto from "crypto";

function verifyMalumSignature(payload: Record<string, unknown>) {
  const txn = String(payload.txn ?? "");
  const timestamp = String(payload.timestamp ?? "");
  const signature = String(payload.signature ?? "");
  const webhookKey = process.env.MALUM_WEBHOOK_KEY ?? "";

  if (!txn || !timestamp || !signature || !webhookKey) {
    return false;
  }

  const expected = crypto
    .createHash("md5")
    .update(`${txn}|${timestamp}|${webhookKey}`)
    .digest("hex");

  return expected === signature;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (
      !payload ||
      typeof payload !== "object" ||
      Array.isArray(payload)
    ) {
      return Response.json(
        { ok: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    if (!verifyMalumSignature(payload as Record<string, unknown>)) {
      return Response.json(
        { ok: false, error: "Invalid signature" },
        { status: 401 }
      );
    }

    return Response.json({
      ok: true,
      provider: "malum",
      received: true,
      status: (payload as Record<string, unknown>).status ?? null,
      txn: (payload as Record<string, unknown>).txn ?? null,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}