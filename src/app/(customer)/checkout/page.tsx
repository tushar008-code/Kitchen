"use client";

import { useCart, getTotalQty } from "@/store/useCart.store";
import UserDetailsForm from "@/components/userDetailForm.client";
import OrderSummay from "@/components/orderSummay";

export default function CheckoutPage() {
  const items = useCart((s) => s.items);

  const totalQty = getTotalQty(items);

  if (totalQty === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-600">
        Your cart is empty. Add something delicious first 😋
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* RIGHT COLUMN — USER DETAILS */}
        <UserDetailsForm />
        {/* LEFT COLUMN — Order Summary + Payment */}

        <OrderSummay />
      </div>

      {/* PAYMENT CONFIRM MODAL */}
    </div>
  );
}
