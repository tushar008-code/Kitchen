import { db } from "@/db";
import { dishes as dishesTable } from "@/db/schema";
import { asc } from "drizzle-orm";
import Image from "next/image";
import DishButton from "./dishbutton.client";

export default async function Dishes() {
  // Fetch dishes from DB
  const dishes = await db
    .select()
    .from(dishesTable)
    .orderBy(asc(dishesTable.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Our Special Dishes
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Handpicked favorites from our kitchen
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {/* Image */}
            <div className="relative h-48 w-full">
              {dish.image && (
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover"
                />
              )}

              {/* Category Badge */}
              {dish.category && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {dish.category}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {dish.name}
                </h3>
                <span className="text-lg font-bold text-green-600">
                  ₹{dish.price}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{dish.description}</p>

              {/* Rating removed (DB me abhi rating nahi hai) */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {/* Placeholder rating */}⭐ 4.5
                </span>

                <DishButton
                  dishItem={{
                    id: dish.id,
                    name: dish.name,
                    price: Number(dish.price),
                    image: dish.image || "",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
