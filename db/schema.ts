import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id"),
  subscriptionId: text("subscription_id"),
  subscriptionStatus: text("subscription_status").default("free"),
  planType: text("plan_type").default("free"), // free, pro_monthly, pro_annual
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const rubrics = pgTable("rubrics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  isTemplate: boolean("is_template").default(false),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const criteria = pgTable("criteria", {
  id: serial("id").primaryKey(),
  rubricId: integer("rubric_id").references(() => rubrics.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  weight: integer("weight").default(1),
  sortOrder: integer("sort_order").default(0),
});

export const performanceLevels = pgTable("performance_levels", {
  id: serial("id").primaryKey(),
  rubricId: integer("rubric_id").references(() => rubrics.id).notNull(),
  name: text("name").notNull(), // e.g., "Excellent", "Good", "Needs Improvement"
  points: integer("points").notNull(),
  sortOrder: integer("sort_order").default(0),
});

export const cellDescriptions = pgTable("cell_descriptions", {
  id: serial("id").primaryKey(),
  criterionId: integer("criterion_id").references(() => criteria.id).notNull(),
  levelId: integer("level_id").references(() => performanceLevels.id).notNull(),
  description: text("description").notNull(),
});
