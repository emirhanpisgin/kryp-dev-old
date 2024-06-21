CREATE TABLE IF NOT EXISTS "blog" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"tags" text[],
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"content" text NOT NULL,
	"author" text
);
