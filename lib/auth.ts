import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle/db";
import { schema } from "@/drizzle/schema";
import { nextCookies } from "better-auth/next-js";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseURL) {
  throw new Error("❌ Missing NEXT_PUBLIC_BASE_URL in environment variables.");
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
  baseURL,
});
