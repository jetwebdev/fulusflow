export default function BuySuccessPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
          Fulus Flow
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Payment received
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Your payment session was completed. We will confirm the transaction status
          and continue the Route 1 flow once provider confirmation is received.
        </p>
      </div>
    </main>
  );
}