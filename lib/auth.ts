// lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle/db";
import { schema } from "@/drizzle/schema";
import { nextCookies } from "better-auth/next-js";
import { sql } from "drizzle-orm";

const customAdapter = {
  ...drizzleAdapter(db, { provider: "pg", schema }),
  async getAccountByProvider(providerId: string, accountId: string) {
    const account = await db
      .select()
      .from(schema.account)
      .where(
        sql`${schema.account.providerId} = ${providerId} AND ${schema.account.accountId} = ${accountId}`
      );
    console.log("Fetched account:", account);
    if (account[0]) {
      account[0].scope = account[0].scope ?? ""; // Ensure scope is not null
    }
    return account[0] ?? null;
  },
};

export const auth = betterAuth({
  database: customAdapter,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
});