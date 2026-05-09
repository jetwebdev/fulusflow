import { NextRequest, NextResponse } from "next/server";

type Asset = "ETH" | "MATIC";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const amount = Number(searchParams.get("amount"));
    const email = String(searchParams.get("email") || "").trim();
    const wallet = String(searchParams.get("wallet") || "").trim();
    const asset = String(searchParams.get("asset") || "ETH") as Asset;

    if (!amount || amount < 10) {
      return NextResponse.redirect(
        new URL("/buy?error=Minimum%20test%20amount%20is%20%2410.", req.url)
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.redirect(
        new URL("/buy?error=Enter%20a%20valid%20email%20address.", req.url)
      );
    }

    if (!wallet || wallet.length < 24) {
      return NextResponse.redirect(
        new URL("/buy?error=Enter%20a%20valid%20wallet%20address.", req.url)
      );
    }

    const destinationCurrency = asset === "MATIC" ? "matic" : "eth";
    const destinationNetwork = asset === "MATIC" ? "polygon" : "ethereum";

    const params = new URLSearchParams();
    params.append("customer_information[email]", email);
    params.append(
      "transaction_details[destination_currency]",
      destinationCurrency
    );
    params.append(
      "transaction_details[destination_network]",
      destinationNetwork
    );
    params.append(
      "transaction_details[source_exchange_amount]",
      amount.toFixed(2)
    );
    params.append(`wallet_addresses[${destinationNetwork}]`, wallet);

    const stripeRes = await fetch("https://api.stripe.com/v1/crypto/onramp_sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Stripe-Version": "2026-04-22.dahlia",
      },
      body: params.toString(),
    });

    const raw = await stripeRes.text();
    console.log("Stripe onramp raw response:", raw);

    let session: any = {};
    try {
      session = JSON.parse(raw);
    } catch {
      session = { raw };
    }

    if (!stripeRes.ok) {
      console.error("Stripe onramp API error:", session);

      const message =
        session?.error?.message ||
        session?.message ||
        `Stripe API error (${stripeRes.status})`;

      return NextResponse.redirect(
        new URL(`/buy?error=${encodeURIComponent(message)}`, req.url)
      );
    }

    if (!session.redirect_url) {
      console.error("Stripe onramp missing redirect_url:", session);

      return NextResponse.redirect(
        new URL(
          "/buy?error=Stripe%20did%20not%20return%20a%20hosted%20redirect%20URL.",
          req.url
        )
      );
    }

    return NextResponse.redirect(session.redirect_url);
  } catch (error) {
    console.error("Stripe hosted onramp session error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to create hosted onramp session.";

    return NextResponse.redirect(
      new URL(`/buy?error=${encodeURIComponent(message)}`, req.url)
    );
  }
}
