"use client";

import { useCart, getTotalQty } from "@/store/useCart.store";
import UserDetailsForm from "@/components/userDetailForm.client";
import OrderSummay from "@/components/orderSummay";
import Link from "next/link";

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const totalQty = getTotalQty(items);

  if (totalQty === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl">🛒</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Add some delicious dishes first to checkout
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Checkout</h1>
        <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Details Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm mr-2">
                1
              </span>
              Delivery Information
            </h2>
            <UserDetailsForm />
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-orange-200 p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm mr-2">
                2
              </span>
              Order Summary
            </h2>
            <OrderSummay />
          </div>
        </div>
      </div>
    </div>
  );
}
