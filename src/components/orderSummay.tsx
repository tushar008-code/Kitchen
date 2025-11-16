'use client";';

import { getTotalPrice, getTotalQty, useCart } from "@/store/useCart.store";
import OrderButton from "./orderButton.client";

function OrderSummay() {
  const items = useCart((s) => s.items);

  const totalQty = getTotalQty(items);
  const totalPrice = getTotalPrice(items);

  return (
    <div className="space-y-10">
      {/* Order Summary */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="flex justify-between text-gray-700 mb-2">
          <span>Total Items:</span>
          <span>{totalQty}</span>
        </div>

        <div className="flex justify-between text-lg font-bold">
          <span>Total Amount:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment */}
      <OrderButton />
    </div>
  );
}

export default OrderSummay;
