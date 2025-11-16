"use client";

import { useState } from "react";
import { useUserDetail } from "@/store/useUserDetail.store";
import { findUserByPhone } from "@/actions/user.actions";

export default function UserDetailsForm() {
  const { user, updateField, setAll } = useUserDetail();
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  async function handleFetchUser() {
    if (!user.phone || user.phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await findUserByPhone(String(user.phone));

      if (res) {
        setUserExists(true);
        // Auto-fill user details
        setAll({
          name: res.name || "",
          addressLine1: res.addressLine1 || "",
          addressLine2: res.addressLine2 || "",
          city: res.city || "",
          pincode: res.pincode || "",
        });
      } else {
        setUserExists(false);
        // Clear other fields but keep phone
        setAll({
          name: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          pincode: "",
        });
      }
    } catch (err) {
      console.error(err);
      setError("Server error — unable to fetch user.");
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={(e) => {
              updateField("phone", e.target.value.trim());
              setUserExists(null);
            }}
            placeholder="Phone Number *"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
        </div>

        <button
          onClick={handleFetchUser}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-orange-400 transition-colors duration-200 font-medium whitespace-nowrap flex-shrink-0"
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Checking...
            </span>
          ) : (
            "Fetch Details"
          )}
        </button>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </p>
        </div>
      )}

      {userExists === true && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            User found — details loaded automatically
          </p>
        </div>
      )}

      {userExists === false && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-600 text-sm flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            New user — please enter your details below
          </p>
        </div>
      )}

      {/* Show rest of form ONLY when userExists !== null */}
      {userExists !== null && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              value={user.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="addressLine1"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address Line 1 *
            </label>
            <input
              id="addressLine1"
              name="addressLine1"
              value={user.addressLine1}
              onChange={(e) => updateField("addressLine1", e.target.value)}
              placeholder="House no., Building, Street"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="addressLine2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address Line 2
            </label>
            <input
              id="addressLine2"
              name="addressLine2"
              value={user.addressLine2}
              onChange={(e) => updateField("addressLine2", e.target.value)}
              placeholder="Area, Landmark (optional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City *
              </label>
              <input
                id="city"
                name="city"
                value={user.city}
                onChange={(e) => updateField("city", e.target.value)}
                placeholder="City"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="pincode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                PIN Code *
              </label>
              <input
                id="pincode"
                name="pincode"
                value={user.pincode}
                onChange={(e) => updateField("pincode", e.target.value)}
                placeholder="560001"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          {/* <div className="pt-4">
            <button
              type="button"
              onClick={() => {
              }}
              className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
            >
              Continue to Payment
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
}
