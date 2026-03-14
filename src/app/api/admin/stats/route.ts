import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { treatments, cities, prices, priceReports, articles, contactMessages, newsletterSubscribers } from "@/lib/db/schema";
import { sql, eq } from "drizzle-orm";

export async function GET() {
  const [
    treatmentCount,
    cityCount,
    priceCount,
    reportCount,
    articleCount,
    contactCount,
    subscriberCount,
  ] = await Promise.all([
    db.select({ count: sql<number>`COUNT(*)` }).from(treatments),
    db.select({ count: sql<number>`COUNT(*)` }).from(cities),
    db.select({ count: sql<number>`COUNT(*)` }).from(prices),
    db.select({ count: sql<number>`COUNT(*)` }).from(priceReports),
    db.select({ count: sql<number>`COUNT(*)` }).from(articles),
    db.select({ count: sql<number>`COUNT(*)` }).from(contactMessages),
    db.select({ count: sql<number>`COUNT(*)` }).from(newsletterSubscribers),
  ]);

  const pendingReports = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(priceReports)
    .where(eq(priceReports.status, "pending"));

  return NextResponse.json({
    treatments: Number(treatmentCount[0]?.count || 0),
    cities: Number(cityCount[0]?.count || 0),
    prices: Number(priceCount[0]?.count || 0),
    priceReports: Number(reportCount[0]?.count || 0),
    pendingReports: Number(pendingReports[0]?.count || 0),
    articles: Number(articleCount[0]?.count || 0),
    contacts: Number(contactCount[0]?.count || 0),
    subscribers: Number(subscriberCount[0]?.count || 0),
  });
}
