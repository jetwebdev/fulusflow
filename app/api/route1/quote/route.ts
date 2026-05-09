import { route1QuoteSchema } from "@/lib/zod/route1";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = route1QuoteSchema.safeParse(body);

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

    const { amountUsd, currency, senderEmail, walletAddress, network } =
      parsed.data;

    const feeRate = 0.2;
    const feeUsd = Number((amountUsd * feeRate).toFixed(2));
    const estimatedCryptoUsd = Number((amountUsd - feeUsd).toFixed(2));

    return Response.json({
      ok: true,
      quote: {
        route: "route1",
        currency,
        senderEmail,
        walletAddress,
        network,
        amountUsd,
        feeRate,
        feeUsd,
        estimatedCryptoUsd,
        provider: "malum",
      },
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