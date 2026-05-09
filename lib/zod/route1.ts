import { z } from "zod";

const route1BaseSchema = z.object({
  amountUsd: z.number().positive().max(3000),
  currency: z.literal("USD").default("USD"),
  senderEmail: z.string().email(),
  walletAddress: z.string().min(24).max(120),
  network: z.enum(["TRC20", "BASE"]),
});

export const route1QuoteSchema = route1BaseSchema;

export type Route1QuoteInput = z.infer<typeof route1QuoteSchema>;

export const route1SessionSchema = route1BaseSchema.extend({
  senderName: z.string().min(2).max(120).optional(),
});

export type Route1SessionInput = z.infer<typeof route1SessionSchema>;