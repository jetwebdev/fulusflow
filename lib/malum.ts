function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const malumConfig = {
  baseUrl: requireEnv("MALUM_BASE_URL"),
  businessId: requireEnv("MALUM_BUSINESS_ID"),
  privateKey: requireEnv("MALUM_PRIVATE_KEY"),
  publicKey: requireEnv("MALUM_PUBLIC_KEY"),
  webhookKey: requireEnv("MALUM_WEBHOOK_KEY"),
};

export function getMalumAuthHeader() {
  return `${malumConfig.businessId}:${malumConfig.privateKey}`;
}

export async function createMalumTransaction(input: {
  amount: number;
  currency: string;
  customer_email: string;
  success_url: string;
  cancel_url: string;
  webhook_url: string;
  buyer_pays_fees?: boolean;
  metadata?: string;
  title?: string;
  description?: string;
  payment_methods?: string[];
}) {
  const response = await fetch(`${malumConfig.baseUrl}/api/v2/payment/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      MALUM: getMalumAuthHeader(),
    },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  const text = await response.text();

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    throw new Error(
      `Malum create transaction failed (${response.status}): ${JSON.stringify(data)}`
    );
  }

  return data;
}