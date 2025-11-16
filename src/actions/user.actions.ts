// app/actions/user.actions.ts
"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function findUserByPhone(rawPhone: unknown) {
  console.log("SERVER PHONE TYPE:", typeof rawPhone, rawPhone);
  const phone =
    typeof rawPhone === "string"
      ? rawPhone.trim()
      : String(rawPhone ?? "").trim();

  if (!phone || phone.length < 10) return null;

  const result = await db.select().from(users).where(eq(users.phone, phone));

  return result[0] ?? null;
}

export async function createUser(data: {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  pincode: string;
}) {
  const [newUser] = await db.insert(users).values(data).returning();
  return newUser;
}
