export default function BuyCancelPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
          Fulus Flow
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Payment cancelled
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          The payment session was cancelled before completion. You can return to the
          buy flow and start again when ready.
        </p>
      </div>
    </main>
  );
}