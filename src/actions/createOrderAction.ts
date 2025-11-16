"use server";

import { db } from "@/db";
import { users, orders, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createOrderAction(payload: any) {
  const { user, items, paymentMode, totalAmount } = payload;

  // 1️⃣ Check existing user
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.phone, user.phone));

  let userId: number;

  if (existingUser.length > 0) {
    userId = existingUser[0].id;
  } else {
    // 2️⃣ Create new user
    const [newUser] = await db
      .insert(users)
      .values({
        name: user.name,
        phone: user.phone,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
        city: user.city,
        pincode: user.pincode,
      })
      .returning({ id: users.id });

    userId = newUser.id;
  }

  // 3️⃣ Create Order (snapshot)
  const [order] = await db
    .insert(orders)
    .values({
      //   userId, // optional, if you want relation
      name: user.name,
      phone: user.phone,
      addressLine1: user.addressLine1,
      addressLine2: user.addressLine2,
      city: user.city,
      pincode: user.pincode,
      paymentMode,
      totalAmount,
    })
    .returning({ id: orders.id });

  // 4️⃣ Create Order Items
  const orderItemsPayload = items.map((i: any) => ({
    orderId: order.id,
    dishId: i.id,
    name: i.name,
    price: i.price,
    quantity: i.quantity,
    image: i.image ?? null,
  }));

  await db.insert(orderItems).values(orderItemsPayload);

  return order.id;
}
