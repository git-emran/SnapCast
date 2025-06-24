// route.ts
import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";
import aj from "@/lib/arcjet";
import { slidingWindow, validateEmail } from "@arcjet/next";
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
    try {
      const body = await req.clone().json();
      if (typeof body.email === "string") {
        return emailValidation.protect(req, { email: body.email });
      }
    } catch (err) {
      // Invalid JSON or no body
      return rateLimit.protect(req, { fingerprint: userId });
    }
  }
  return rateLimit.protect(req, { fingerprint: userId });
};

const authHandlers = toNextJsHandler(auth.handler);

export const GET = authHandlers.GET;

export const POST = async (req: NextRequest) => {
  try {
    const decision = await protectedAuth(req);
    if (decision.isDenied()) {
      if (decision.reason.isEmail()) {
        return NextResponse.json({ error: "Email validation failed" }, { status: 400 });
      }
      if (decision.reason.isRateLimit()) {
        return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
      }
      if (decision.reason.isShield()) {
        return NextResponse.json({ error: "Shield turned on, try again later" }, { status: 403 });
      }
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }
    return await authHandlers.POST(req);
  } catch (error) {
    // Log the error for debugging
    console.error("Auth POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
};
