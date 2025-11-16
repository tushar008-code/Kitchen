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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <Image
          src="/empty-cart.png"
          alt="empty cart"
          width={200}
          height={200}
        />
        <h2 className="text-2xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
        <p className="text-gray-500">
          Add some delicious dishes to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Order</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white rounded-xl shadow-md p-4"
          >
            <div className="flex items-center gap-4">
              {/* Dish Image */}
              <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-gray-100">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Dish Info */}
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">
                  ${item.price.toFixed(2)}
                </p>

                {/* Item Price Total */}
                <p className="text-sm text-gray-700 mt-1 font-medium">
                  Item total: ${getItemTotal(items, item.id).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Quantity Counter */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrease(item.id)}
                className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-lg"
              >
                -
              </button>

              <span className="min-w-[28px] text-center">{item.quantity}</span>

              <button
                onClick={() => increase(item.id)}
                className="w-8 h-8 bg-indigo-600 text-white rounded-md flex items-center justify-center text-lg"
              >
                +
              </button>

              {/* Remove */}
              <button
                onClick={() => remove(item.id)}
                className="text-red-500 font-medium ml-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-10 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        <div className="flex justify-between text-gray-600 mb-2">
          <span>Total Items:</span>
          <span>{totalQty}</span>
        </div>

        <div className="flex justify-between text-lg font-semibold">
          <span>Total Amount:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <button
          onClick={() => router.push("/checkout")}
          className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-md text-lg font-medium hover:bg-indigo-700 transition"
        >
          Proceed to Checkout
        </button>

        <button
          onClick={clear}
          className="mt-3 w-full text-red-500 text-sm underline"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
