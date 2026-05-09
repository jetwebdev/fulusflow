export default function CancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-amber-500/20 bg-white/5 p-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Checkout cancelled</p>
        <h1 className="mt-4 text-4xl font-semibold">No payment was completed.</h1>
        <p className="mt-4 text-slate-300">
          You can go back and try again with a different provider, amount, or wallet address.
        </p>
        <a
          href="/"
          className="mt-8 inline-block rounded-2xl bg-amber-300 px-5 py-3 font-medium text-slate-950"
        >
          Return to buy flow
        </a>
      </div>
    </main>
  );
}
