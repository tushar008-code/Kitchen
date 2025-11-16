"use client";

import { getItemQty, useCart } from "@/store/useCart.store";

export default function DishButton({
  dishItem,
}: {
  dishItem: {
    id: number;
    name: string;
    price: number;
    image: string | null;
  };
}) {
  const items = useCart((s) => s.items);
  const addItem = useCart((s) => s.addItem);
  const increase = useCart((s) => s.increase);
  const decrease = useCart((s) => s.decrease);

  const qty = getItemQty(items, dishItem.id);
  const price = Number(dishItem.price);

  if (qty === 0) {
    return (
      <button
        onClick={() =>
          addItem({
            id: dishItem.id,
            name: dishItem.name,
            price,
            image: dishItem.image || "",
          })
        }
        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors duration-200 active:scale-95"
      >
        Add to Cart
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-orange-50 rounded-lg px-3 py-2 border border-orange-200">
      <button
        onClick={() => decrease(dishItem.id)}
        className="w-8 h-8 flex items-center justify-center bg-white text-orange-600 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors duration-200 active:scale-95"
        aria-label="Decrease quantity"
      >
        <span className="text-lg font-medium">−</span>
      </button>

      <span className="min-w-[32px] text-center font-semibold text-gray-900">
        {qty}
      </span>

      <button
        onClick={() => increase(dishItem.id)}
        className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 active:scale-95"
        aria-label="Increase quantity"
      >
        <span className="text-lg font-medium">+</span>
      </button>
    </div>
  );
}
