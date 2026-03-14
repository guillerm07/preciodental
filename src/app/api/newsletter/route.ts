import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const existing = await db.query.newsletterSubscribers.findFirst({
    where: eq(newsletterSubscribers.email, email),
  });

  if (existing) {
    return NextResponse.json({ success: true, message: "Already subscribed" });
  }

  await db.insert(newsletterSubscribers).values({ email });

  return NextResponse.json({ success: true });
}
