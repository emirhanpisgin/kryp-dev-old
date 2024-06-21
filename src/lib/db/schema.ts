import { InferModel, InferSelectModel } from "drizzle-orm";
import { pgTable, timestamp, text } from "drizzle-orm/pg-core";

export const blogs = pgTable("blog", {
	id: text("id").primaryKey().notNull(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	tags: text("tags").default('RRAY[').array().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	content: text("content").notNull(),
	author: text("author"),
});

export type blogType = InferSelectModel<typeof blogs>;