import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  decimal,
  timestamp,
  date,
  jsonb,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ── Enums ──────────────────────────────────────────────────────────────────────

export const sourceTypeEnum = pgEnum("source_type", [
  "insurance_pdf",
  "chain_website",
  "clinic_website",
  "crowdsource",
  "manual",
]);

export const zoneEnum = pgEnum("zone", ["A", "B"]);

export const reportStatusEnum = pgEnum("report_status", [
  "pending",
  "approved",
  "rejected",
]);

export const articleStatusEnum = pgEnum("article_status", [
  "draft",
  "published",
  "archived",
]);

export const keywordIntentEnum = pgEnum("keyword_intent", [
  "informational",
  "commercial",
  "transactional",
]);

export const keywordSourceEnum = pgEnum("keyword_source", [
  "ahrefs_explorer",
  "cleardent_organic",
  "vitaldent_organic",
]);

// ── Treatments ─────────────────────────────────────────────────────────────────

export const treatments = pgTable(
  "treatments",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    description: text("description"),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),
    heroImageUrl: text("hero_image_url"),
    displayOrder: integer("display_order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("treatments_slug_idx").on(table.slug)]
);

export const treatmentsRelations = relations(treatments, ({ many }) => ({
  aliases: many(treatmentAliases),
  prices: many(prices),
  priceReports: many(priceReports),
  articles: many(articles),
  keywords: many(keywords),
  images: many(images),
  clinicPrices: many(clinicPrices),
}));

// ── Treatment Aliases ──────────────────────────────────────────────────────────

export const treatmentAliases = pgTable("treatment_aliases", {
  id: serial("id").primaryKey(),
  treatmentId: integer("treatment_id")
    .notNull()
    .references(() => treatments.id, { onDelete: "cascade" }),
  alias: varchar("alias", { length: 255 }).notNull(),
  source: varchar("source", { length: 100 }),
});

export const treatmentAliasesRelations = relations(
  treatmentAliases,
  ({ one }) => ({
    treatment: one(treatments, {
      fields: [treatmentAliases.treatmentId],
      references: [treatments.id],
    }),
  })
);

// ── Cities ─────────────────────────────────────────────────────────────────────

export const cities = pgTable(
  "cities",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    province: varchar("province", { length: 255 }).notNull(),
    community: varchar("community", { length: 255 }).notNull(),
    communitySlug: varchar("community_slug", { length: 255 }).notNull(),
    zone: zoneEnum("zone"),
    population: integer("population"),
    latitude: decimal("latitude", { precision: 10, scale: 7 }),
    longitude: decimal("longitude", { precision: 10, scale: 7 }),
  },
  (table) => [uniqueIndex("cities_slug_idx").on(table.slug)]
);

export const citiesRelations = relations(cities, ({ many }) => ({
  prices: many(prices),
  priceReports: many(priceReports),
  clinics: many(clinics),
  articles: many(articles),
  keywords: many(keywords),
}));

// ── Prices ─────────────────────────────────────────────────────────────────────

export const prices = pgTable("prices", {
  id: serial("id").primaryKey(),
  treatmentId: integer("treatment_id")
    .notNull()
    .references(() => treatments.id, { onDelete: "cascade" }),
  cityId: integer("city_id").references(() => cities.id, {
    onDelete: "set null",
  }),
  sourceType: sourceTypeEnum("source_type").notNull(),
  sourceName: varchar("source_name", { length: 255 }).notNull(),
  sourceUrl: text("source_url"),
  priceMin: decimal("price_min", { precision: 10, scale: 2 }),
  priceMax: decimal("price_max", { precision: 10, scale: 2 }),
  priceExact: decimal("price_exact", { precision: 10, scale: 2 }),
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  year: integer("year").notNull(),
  zone: zoneEnum("zone"),
  includesTax: boolean("includes_tax").default(true).notNull(),
  notes: text("notes"),
  verified: boolean("verified").default(false).notNull(),
  scrapedAt: timestamp("scraped_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pricesRelations = relations(prices, ({ one }) => ({
  treatment: one(treatments, {
    fields: [prices.treatmentId],
    references: [treatments.id],
  }),
  city: one(cities, {
    fields: [prices.cityId],
    references: [cities.id],
  }),
}));

// ── Price Reports (Crowdsourcing) ──────────────────────────────────────────────

export const priceReports = pgTable("price_reports", {
  id: serial("id").primaryKey(),
  treatmentId: integer("treatment_id")
    .notNull()
    .references(() => treatments.id, { onDelete: "cascade" }),
  cityId: integer("city_id")
    .notNull()
    .references(() => cities.id, { onDelete: "cascade" }),
  clinicName: text("clinic_name"),
  pricePaid: decimal("price_paid", { precision: 10, scale: 2 }).notNull(),
  hadInsurance: boolean("had_insurance").default(false).notNull(),
  insuranceName: text("insurance_name"),
  dateOfTreatment: date("date_of_treatment"),
  receiptUploaded: boolean("receipt_uploaded").default(false).notNull(),
  ipHash: varchar("ip_hash", { length: 64 }).notNull(),
  status: reportStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const priceReportsRelations = relations(priceReports, ({ one }) => ({
  treatment: one(treatments, {
    fields: [priceReports.treatmentId],
    references: [treatments.id],
  }),
  city: one(cities, {
    fields: [priceReports.cityId],
    references: [cities.id],
  }),
}));

// ── Clinics ────────────────────────────────────────────────────────────────────

export const clinics = pgTable(
  "clinics",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    cityId: integer("city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "cascade" }),
    address: text("address"),
    phone: varchar("phone", { length: 20 }),
    website: text("website"),
    googleMapsUrl: text("google_maps_url"),
    claimed: boolean("claimed").default(false).notNull(),
    active: boolean("active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("clinics_slug_idx").on(table.slug)]
);

export const clinicsRelations = relations(clinics, ({ one, many }) => ({
  city: one(cities, {
    fields: [clinics.cityId],
    references: [cities.id],
  }),
  clinicPrices: many(clinicPrices),
}));

// ── Clinic Prices ──────────────────────────────────────────────────────────────

export const clinicPrices = pgTable("clinic_prices", {
  id: serial("id").primaryKey(),
  clinicId: integer("clinic_id")
    .notNull()
    .references(() => clinics.id, { onDelete: "cascade" }),
  treatmentId: integer("treatment_id")
    .notNull()
    .references(() => treatments.id, { onDelete: "cascade" }),
  priceFrom: decimal("price_from", { precision: 10, scale: 2 }).notNull(),
  priceTo: decimal("price_to", { precision: 10, scale: 2 }),
  includesFinancing: boolean("includes_financing").default(false).notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const clinicPricesRelations = relations(clinicPrices, ({ one }) => ({
  clinic: one(clinics, {
    fields: [clinicPrices.clinicId],
    references: [clinics.id],
  }),
  treatment: one(treatments, {
    fields: [clinicPrices.treatmentId],
    references: [treatments.id],
  }),
}));

// ── Articles ───────────────────────────────────────────────────────────────────

export const articles = pgTable(
  "articles",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    content: text("content").notNull(),
    excerpt: text("excerpt").notNull(),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),
    featuredImageUrl: text("featured_image_url"),
    tableOfContents: jsonb("table_of_contents"),
    faq: jsonb("faq"),
    treatmentId: integer("treatment_id").references(() => treatments.id, {
      onDelete: "set null",
    }),
    cityId: integer("city_id").references(() => cities.id, {
      onDelete: "set null",
    }),
    targetKeywords: text("target_keywords").array(),
    wordCount: integer("word_count").default(0).notNull(),
    readingTime: integer("reading_time").default(0).notNull(),
    status: articleStatusEnum("status").default("draft").notNull(),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("articles_slug_idx").on(table.slug)]
);

export const articlesRelations = relations(articles, ({ one, many }) => ({
  treatment: one(treatments, {
    fields: [articles.treatmentId],
    references: [treatments.id],
  }),
  city: one(cities, {
    fields: [articles.cityId],
    references: [cities.id],
  }),
  images: many(images),
}));

// ── Keywords ───────────────────────────────────────────────────────────────────

export const keywords = pgTable("keywords", {
  id: serial("id").primaryKey(),
  keyword: text("keyword").notNull(),
  volume: integer("volume").default(0).notNull(),
  kd: integer("kd"),
  cpc: decimal("cpc", { precision: 6, scale: 2 }),
  treatmentId: integer("treatment_id").references(() => treatments.id, {
    onDelete: "set null",
  }),
  cityId: integer("city_id").references(() => cities.id, {
    onDelete: "set null",
  }),
  intent: keywordIntentEnum("intent"),
  isQuestion: boolean("is_question").default(false).notNull(),
  isBranded: boolean("is_branded").default(false).notNull(),
  source: keywordSourceEnum("source").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const keywordsRelations = relations(keywords, ({ one }) => ({
  treatment: one(treatments, {
    fields: [keywords.treatmentId],
    references: [treatments.id],
  }),
  city: one(cities, {
    fields: [keywords.cityId],
    references: [cities.id],
  }),
}));

// ── Images ─────────────────────────────────────────────────────────────────────

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  articleId: integer("article_id").references(() => articles.id, {
    onDelete: "set null",
  }),
  treatmentId: integer("treatment_id").references(() => treatments.id, {
    onDelete: "set null",
  }),
  url: text("url").notNull(),
  altText: text("alt_text").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const imagesRelations = relations(images, ({ one }) => ({
  article: one(articles, {
    fields: [images.articleId],
    references: [articles.id],
  }),
  treatment: one(treatments, {
    fields: [images.treatmentId],
    references: [treatments.id],
  }),
}));

// ── Newsletter Subscribers ─────────────────────────────────────────────────────

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
    confirmed: boolean("confirmed").default(false).notNull(),
  },
  (table) => [uniqueIndex("newsletter_email_idx").on(table.email)]
);

// ── Contact Messages ───────────────────────────────────────────────────────────

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  read: boolean("read").default(false).notNull(),
});

// ── Rate Limits ────────────────────────────────────────────────────────────────

export const rateLimits = pgTable("rate_limits", {
  id: serial("id").primaryKey(),
  ipHash: varchar("ip_hash", { length: 64 }).notNull(),
  action: varchar("action", { length: 50 }).notNull(),
  windowStart: timestamp("window_start").defaultNow().notNull(),
  count: integer("count").default(1).notNull(),
});
