export async function GET() {
  return Response.json({
    ok: true,
    service: "fulusflow-next",
    hasMalumConfig: Boolean(
      process.env.MALUM_BUSINESS_ID &&
        process.env.MALUM_PRIVATE_KEY &&
        process.env.MALUM_WEBHOOK_KEY
    ),
    timestamp: new Date().toISOString(),
  });
}