CREATE TABLE "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"dish_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text,
	"price" numeric NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "city" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "pincode" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "name" varchar(150) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "phone" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "address_line1" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "address_line2" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "city" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "pincode" varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "payment_mode" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "name" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "address_line_1" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "address_line_2" text;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "items";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "payment_method";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "full_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "address1";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "address2";