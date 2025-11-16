"use client";

import { getTotalPrice, getTotalQty, useCart } from "@/store/useCart.store";
import OrderButton from "./orderButton.client";

function OrderSummay() {
  const items = useCart((s) => s.items);
  const totalQty = getTotalQty(items);
  const totalPrice = getTotalPrice(items);

  const deliveryFee = 49;
  const tax = totalPrice * 0.05;
  const finalTotal = totalPrice + deliveryFee + tax;

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Order Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Items ({totalQty})</span>
            <span className="text-gray-900">₹{totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="text-gray-900">₹{deliveryFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (5%)</span>
            <span className="text-gray-900">₹{tax.toFixed(2)}</span>
          </div>

          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between text-base font-semibold">
              <span className="text-gray-900">Total Amount</span>
              <span className="text-orange-600">₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <OrderButton />
    </div>
  );
}

export default OrderSummay;
