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
        className="px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Add
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => decrease(dishItem.id)}
        className="px-3 py-1 bg-gray-200 rounded-md"
      >
        -
      </button>

      <span className="min-w-[28px] text-center">{qty}</span>

      <button
        onClick={() => increase(dishItem.id)}
        className="px-3 py-1 bg-indigo-600 text-white rounded-md"
      >
        +
      </button>
    </div>
  );
}
