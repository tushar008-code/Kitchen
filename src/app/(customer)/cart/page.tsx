"use client";

import { useCart } from "@/store/useCart.store";
import {
  getTotalPrice,
  getTotalQty,
  getItemTotal,
} from "@/store/useCart.store";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const increase = useCart((s) => s.increase);
  const decrease = useCart((s) => s.decrease);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);

  const totalQty = getTotalQty(items);
  const totalPrice = getTotalPrice(items);
  const router = useRouter();

  // 🛒 Empty Cart UI
  if (totalQty === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">🛒</span>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Add some delicious dishes from our menu to get started!
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
        <p className="text-gray-500 mt-1">
          {totalQty} {totalQty === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:border-orange-200 transition-colors duration-200"
              >
                <div className="flex gap-4">
                  {/* Dish Image */}
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Dish Info & Controls */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-orange-600 font-medium text-sm mt-1">
                          ₹{item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => remove(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                        aria-label="Remove item"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-orange-50 rounded-lg px-3 py-2 border border-orange-200">
                        <button
                          onClick={() => decrease(item.id)}
                          className="w-8 h-8 flex items-center justify-center bg-white text-orange-600 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors duration-200"
                          aria-label="Decrease quantity"
                        >
                          <span className="text-lg font-medium">−</span>
                        </button>

                        <span className="min-w-[32px] text-center font-semibold text-gray-900">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increase(item.id)}
                          className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                          aria-label="Increase quantity"
                        >
                          <span className="text-lg font-medium">+</span>
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600">Item total</p>
                        <p className="font-semibold text-orange-600">
                          ₹{getItemTotal(items, item.id).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Clear Cart Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={clear}
              className="text-gray-500 hover:text-red-500 transition-colors duration-200 text-sm font-medium"
            >
              Clear all items
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-8 lg:mt-0">
          <div className="bg-white rounded-xl border border-orange-200 p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">₹{totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="text-gray-900">₹00.00</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">₹00.00</span>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-base font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-orange-600">₹{totalPrice}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium mb-3"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full py-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 text-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
