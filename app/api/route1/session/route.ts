import { createMalumTransaction } from "@/lib/malum";
import { route1SessionSchema } from "@/lib/zod/route1";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = route1SessionSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          ok: false,
          error: "Invalid request body",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const {
      amountUsd,
      currency,
      senderEmail,
      walletAddress,
      network,
      senderName,
    } = parsed.data;

    const result = await createMalumTransaction({
      title: "Fulus Flow Crypto Purchase",
      description: `Buy crypto via Route 1 - ${currency}`,
      amount: amountUsd,
      currency,
      customer_email: senderEmail,
      success_url: `${process.env.APP_BASE_URL}/buy/success`,
      cancel_url: `${process.env.APP_BASE_URL}/buy/cancel`,
      webhook_url: `${process.env.APP_BASE_URL}/api/webhooks/malum`,
      buyer_pays_fees: true,
      payment_methods: ["card"],
      metadata: JSON.stringify({
        route: "route1",
        senderName: senderName ?? null,
        walletAddress,
        network,
      }),
    });

    return Response.json({
      ok: true,
      provider: "malum",
      session: result,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}