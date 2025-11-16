"use client";

import { useState } from "react";
import { useUserDetail } from "@/store/useUserDetail.store";
import { findUserByPhone } from "@/actions/user.actions";

export default function UserDetailsForm() {
  const { user, updateField, setAll } = useUserDetail();

  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState<boolean | null>(null); // null = not checked yet
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
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">Your Details</h2>

      <div className="space-y-4">
        {/* PHONE + FETCH BUTTON */}
        <div className="flex gap-3">
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={(e) => {
              updateField("phone", e.target.value.trim());
              setUserExists(null);
            }}
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button
            onClick={handleFetchUser}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            {loading ? "Checking..." : "Fetch"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {userExists === true && (
          <p className="text-green-600 text-sm">
            ✓ User found — details loaded
          </p>
        )}

        {userExists === false && (
          <p className="text-blue-600 text-sm">
            New user — please enter your details
          </p>
        )}

        {/* Show rest of form ONLY when userExists !== null */}
        {userExists !== null && (
          <>
            <input
              name="name"
              value={user.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              name="addressLine1"
              value={user.addressLine1}
              onChange={(e) => updateField("addressLine1", e.target.value)}
              placeholder="Address Line 1"
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              name="addressLine2"
              value={user.addressLine2}
              onChange={(e) => updateField("addressLine2", e.target.value)}
              placeholder="Address Line 2"
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              name="city"
              value={user.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="City"
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              name="pincode"
              value={user.pincode}
              onChange={(e) => updateField("pincode", e.target.value)}
              placeholder="PIN Code"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </>
        )}
      </div>
    </div>
  );
}
