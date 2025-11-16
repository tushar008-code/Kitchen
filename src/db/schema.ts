import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
  numeric,
  jsonb,
} from "drizzle-orm/pg-core";

export const dishes = pgTable("dishes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  image: text("image"),
  category: varchar("category", { length: 100 }),
  price: numeric("price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  phone: varchar("phone", { length: 20 }).notNull().unique(),
  addressLine1: text("address_line_1"),
  addressLine2: text("address_line_2"),
  city: varchar("city", { length: 100 }),
  pincode: varchar("pincode", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),

  // User details (no separate user table needed)
  name: varchar("name", { length: 150 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2"),
  city: varchar("city", { length: 100 }).notNull(),
  pincode: varchar("pincode", { length: 10 }).notNull(),

  paymentMode: varchar("payment_mode", { length: 20 }).notNull(), // "pod" | "online"

  totalAmount: numeric("total_amount").notNull(),

  status: varchar("status", { length: 50 }).notNull().default("pending"), // pending, accepted, preparing, out-for-delivery, delivered, cancelled

  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),

  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),

  dishId: integer("dish_id").notNull(),

  name: varchar("name", { length: 255 }).notNull(),
  image: text("image"),

  price: numeric("price").notNull(),
  quantity: integer("quantity").notNull(),
});
