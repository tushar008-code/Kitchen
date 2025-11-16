CREATE TABLE "dishes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"image" text,
	"category" varchar(100),
	"price" numeric NOT NULL,
	"created_at" timestamp DEFAULT now()
);
