import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";
import aj from "@/lib/arcjet";
import arcjet, { slidingWindow, validateEmail } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";
import type { ArcjetDecision } from "@arcjet/next";
import ip from "@arcjet/next";

// Email Validation
const emailValidation = aj.withRule(
  validateEmail({
    mode: "LIVE",
    block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
  })
);

// Rate Limit
const rateLimit = aj.withRule(
  slidingWindow({
    mode: "LIVE",
    interval: "2m",
    max: 2,
    characteristics: ["fingerprint"],
  })
);

const protectedAuth = async (req: NextRequest): Promise<ArcjetDecision> => {
  const session = await auth.api.getSession({ headers: req.headers });
  let userId: string;
  if (session?.user?.id) {
    userId = session.user.id;
  } else {
    userId = ip(req) || "127.0.0.1";
  }
  if (req.nextUrl.pathname.startsWith("/api/auth/sign-in")) {
    const body = await req.clone().json();
    if (typeof body.email === "string") {
      return emailValidation.protect(req, { email: body.email });
    }
  }
  return rateLimit.protect(req, { fingerprint: userId });
};

const authHandlers = toNextJsHandler(auth.handler);

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "https:https://snap-cast-one.vercel.app",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle OPTIONS preflight request
export const OPTIONS = async () => {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
};

export const GET = async (req: NextRequest) => {
  const response = await authHandlers.GET(req);
  // Add CORS headers to GET response
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
};

export const POST = async (req: NextRequest) => {
  const decision = await protectedAuth(req);
  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      return new NextResponse(
        JSON.stringify({ error: "Email validation failed" }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }
    if (decision.reason.isRateLimit()) {
      return new NextResponse(
        JSON.stringify({ error: "Rate limit exceeded" }),
        {
          status: 429,
          headers: corsHeaders,
        }
      );
    }
    if (decision.reason.isShield()) {
      return new NextResponse(
        JSON.stringify({ error: "Shield turned on, better luck next time" }),
        {
          status: 403,
          headers: corsHeaders,
        }
      );
    }
  }

  const response = await authHandlers.POST(req);
  // Add CORS headers to POST response
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
};
