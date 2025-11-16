import { db } from "@/db";
import { dishes as dishesTable } from "@/db/schema";
import { asc } from "drizzle-orm";
import Image from "next/image";
import DishButton from "./dishbutton.client";

export default async function Dishes() {
  const dishes = await db
    .select()
    .from(dishesTable)
    .orderBy(asc(dishesTable.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Minimal Header */}
      <div className="text-center mb-12">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Our Menu</h1>
        <div className="w-12 h-1 bg-orange-500 mx-auto"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-white rounded-xl border border-gray-100 hover:border-orange-200 transition-all duration-200 group"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
              {dish.image && (
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}

              {/* Category Badge */}
              {dish.category && (
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 border">
                    {dish.category}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
                  {dish.name}
                </h3>
                <span className="text-lg font-semibold text-green-600 whitespace-nowrap ml-2">
                  ₹{dish.price}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                {dish.description}
              </p>

              {/* Action Section */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-sm text-gray-500 flex items-center">
                  <span className="text-orange-400">★</span>
                  <span className="ml-1">4.5</span>
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

      {/* Empty State */}
      {dishes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">🍽️</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No dishes available
          </h3>
          <p className="text-gray-500">Check back later for our menu updates</p>
        </div>
      )}
    </div>
  );
}
