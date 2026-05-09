"use client";

import { useMemo, useState } from "react";
import { CryptoElements, OnrampElement } from "@/components/stripe-onramp";

type Asset = "ETH" | "MATIC";
type ThemeMode = "dark" | "light";

export default function BuyPage() {
  const [amount, setAmount] = useState("100");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [asset, setAsset] = useState<Asset>("ETH");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [sessionStatus, setSessionStatus] = useState("");

  const estimatedFee = useMemo(() => {
    const amt = Number(amount || 0);
    return (amt * 0.2).toFixed(2);
  }, [amount]);

  const estimatedCryptoUsd = useMemo(() => {
    const amt = Number(amount || 0);
    const fee = amt * 0.2;
    return Math.max(amt - fee, 0).toFixed(2);
  }, [amount]);

  const isDark = theme === "dark";
  const showingCheckout = Boolean(clientSecret);

  async function handleContinue() {
    setError("");
    setClientSecret("");
    setSessionStatus("");

    if (!amount || Number(amount) < 10) {
      setError("Minimum test amount is $10.");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    if (!wallet || wallet.length < 24) {
      setError("Enter a valid wallet address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/stripe-onramp/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
          email,
          wallet,
          asset,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok || !data.clientSecret) {
        throw new Error(data?.error || "Unable to start Stripe onramp.");
      }

      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    setClientSecret("");
    setSessionStatus("");
    setError("");
  }

  return (
    <CryptoElements>
      <main
        className={
          isDark
            ? "min-h-screen bg-slate-950 text-white"
            : "min-h-screen bg-slate-100 text-slate-900"
        }
      >
        <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div
              className={
                isDark
                  ? "inline-flex w-fit items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300"
                  : "inline-flex w-fit items-center rounded-full border border-sky-300 bg-sky-100 px-5 py-2 text-sm text-sky-700"
              }
            >
              Fulus Flow • Premium Concierge Remittance. Safe, Transparent & Accountable
            </div>

            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={
                isDark
                  ? "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                  : "rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              }
            >
              Switch to {isDark ? "light" : "dark"} mode
            </button>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p
                className={
                  isDark
                    ? "mb-4 text-sm uppercase tracking-[0.25em] text-slate-400"
                    : "mb-4 text-sm uppercase tracking-[0.25em] text-slate-500"
                }
              >
                Simply Buy crypto with fast direct results
              </p>

              <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
                Buy ETH or MATIC with a card and keep more control over your money.
              </h1>

              <p
                className={
                  isDark
                    ? "mt-6 max-w-2xl text-lg text-slate-300"
                    : "mt-6 max-w-2xl text-lg text-slate-600"
                }
              >
                Begin your next Crypto journey with Fulus Flow who stays focused on speed,
                clarity, and a premium experience while our regulated partner handles the onramp and KYC.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div
                  className={
                    isDark
                      ? "rounded-2xl border border-white/10 bg-white/5 p-4"
                      : "rounded-2xl border border-slate-200 bg-white p-4"
                  }
                >
                  <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>
                    Corridor
                  </p>
                  <p className="mt-2 text-lg font-medium">USD card → crypto wallet</p>
                </div>

                <div
                  className={
                    isDark
                      ? "rounded-2xl border border-white/10 bg-white/5 p-4"
                      : "rounded-2xl border border-slate-200 bg-white p-4"
                  }
                >
                  <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>
                    Assets
                  </p>
                  <p className="mt-2 text-lg font-medium">ETH / MATIC</p>
                </div>

                <div
                  className={
                    isDark
                      ? "rounded-2xl border border-white/10 bg-white/5 p-4"
                      : "rounded-2xl border border-slate-200 bg-white p-4"
                  }
                >
                  <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>
                    Model
                  </p>
                  <p className="mt-2 text-lg font-medium">Non-custodial</p>
                </div>
              </div>
            </div>

            {!showingCheckout ? (
              <div
                className={
                  isDark
                    ? "rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur"
                    : "rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
                }
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold">Start your Fulus Flow</h2>
                  <p className={isDark ? "mt-2 text-sm text-slate-400" : "mt-2 text-sm text-slate-500"}>
                    A premium buy flow built for clarity, trust, control and secure completion.
                  </p>
                </div>

                <div className="space-y-5">
                  <p
                    className={
                      isDark
                        ? "rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-amber-200"
                        : "rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800"
                    }
                  >
                    Launch pricing currently includes a 20% service fee to cover card fees,
                    partner costs, network handling, and compliance overhead.
                  </p>

                  <div>
                    <label className={isDark ? "mb-2 block text-sm text-slate-300" : "mb-2 block text-sm text-slate-700"}>
                      Amount in USD
                    </label>
                    <input
                      type="number"
                      min="10"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className={
                        isDark
                          ? "w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                          : "w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-sky-500"
                      }
                      placeholder="100"
                    />
                  </div>

                  <div>
                    <label className={isDark ? "mb-2 block text-sm text-slate-300" : "mb-2 block text-sm text-slate-700"}>
                      Email for receipt
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={
                        isDark
                          ? "w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                          : "w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-sky-500"
                      }
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className={isDark ? "mb-3 block text-sm text-slate-300" : "mb-3 block text-sm text-slate-700"}>
                      Asset
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "ETH", label: "ETH on Ethereum" },
                        { id: "MATIC", label: "MATIC on Polygon" },
                      ].map((item) => {
                        const active = asset === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setAsset(item.id as Asset)}
                            className={`rounded-2xl border px-4 py-3 text-sm transition ${
                              active
                                ? isDark
                                  ? "border-cyan-400 bg-cyan-500/15 text-white"
                                  : "border-sky-500 bg-sky-100 text-sky-900"
                                : isDark
                                ? "border-white/10 bg-slate-900 text-slate-300 hover:border-white/20"
                                : "border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className={isDark ? "mb-2 block text-sm text-slate-300" : "mb-2 block text-sm text-slate-700"}>
                      Recipient wallet
                    </label>
                    <input
                      type="text"
                      value={wallet}
                      onChange={(e) => setWallet(e.target.value)}
                      className={
                        isDark
                          ? "w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                          : "w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-sky-500"
                      }
                      placeholder={asset === "ETH" ? "Ethereum wallet address" : "Polygon wallet address"}
                    />
                  </div>

                  <div
                    className={
                      isDark
                        ? "rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-sm"
                        : "rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm"
                    }
                  >
                    <div className={isDark ? "flex items-center justify-between py-1 text-slate-300" : "flex items-center justify-between py-1 text-slate-700"}>
                      <span>Estimated Fulus Flow fee</span>
                      <span>${estimatedFee}</span>
                    </div>
                    <div className={isDark ? "flex items-center justify-between py-1 text-slate-300" : "flex items-center justify-between py-1 text-slate-700"}>
                      <span>Estimated crypto buying power</span>
                      <span>${estimatedCryptoUsd}</span>
                    </div>
                  </div>

                  {error ? (
                    <div
                      className={
                        isDark
                          ? "rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                          : "rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700"
                      }
                    >
                      {error}
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={handleContinue}
                    disabled={loading}
                    className={
                      isDark
                        ? "w-full rounded-2xl bg-cyan-400 px-4 py-4 font-semibold text-slate-950 transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
                        : "w-full rounded-2xl bg-sky-600 px-4 py-4 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                    }
                  >
                    {loading ? "Loading secure checkout..." : "Continue to secure checkout"}
                  </button>

                  <p className={isDark ? "text-xs leading-6 text-slate-500" : "text-xs leading-6 text-slate-500"}>
                    By continuing, you'll complete card payment and KYC with our regulated onramp partner.
                    Fulus Flow does not custody your funds.
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={
                  isDark
                    ? "rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur"
                    : "rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
                }
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">Secure checkout</h2>
                    <p className={isDark ? "mt-2 text-sm text-slate-400" : "mt-2 text-sm text-slate-500"}>
                      Finish your crypto purchase securely, then we’ll route the crypto to your wallet.
                    </p>
                    {sessionStatus ? (
                      <p className={isDark ? "mt-2 text-xs text-cyan-300" : "mt-2 text-xs text-sky-700"}>
                        Session status: {sessionStatus}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={handleBack}
                    className={
                      isDark
                        ? "rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                        : "rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                    }
                  >
                    ← Back
                  </button>
                </div>

                <div
                  className={
                    isDark
                      ? "overflow-hidden rounded-3xl border border-white/10 bg-slate-950"
                      : "overflow-hidden rounded-3xl border border-slate-200 bg-slate-50"
                  }
                >
                  <OnrampElement
                    clientSecret={clientSecret}
                    theme={theme}
                    onSessionUpdate={(payload: any) => {
                      const nextStatus = payload?.session?.status;
                      if (nextStatus) {
                        setSessionStatus(nextStatus);
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </CryptoElements>
  );
}