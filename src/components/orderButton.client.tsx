"use client";

import { getTotalPrice, getTotalQty, useCart } from "@/store/useCart.store";
import { useUserDetail } from "@/store/useUserDetail.store";
import { createOrderAction } from "@/actions/createOrderAction";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderButton() {
  const router = useRouter();

  // cart
  const items = useCart((s) => s.items);
  const clearCart = useCart((s) => s.clear);

  // user details (zustand)
  const user = useUserDetail((s) => s.user);
  const clearUser = useUserDetail((s) => s.clear);

  const totalQty = getTotalQty(items);
  const totalPrice = getTotalPrice(items);

  // ui state
  const [paymentMode, setPaymentMode] = useState<"pod" | "online" | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // -----------------------------------------------------
  // Validate before showing confirm modal
  // -----------------------------------------------------
  function openModal(mode: "pod" | "online") {
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!user.phone || user.phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!user.name) {
      setError("Please enter your name.");
      return;
    }

    if (!user.addressLine1 || !user.city || !user.pincode) {
      setError("Please fill your full address.");
      return;
    }

    setPaymentMode(mode);
    setShowModal(true);
  }

  // -----------------------------------------------------
  // Confirm order
  // -----------------------------------------------------
  async function handleConfirm() {
    setError("");

    if (paymentMode === "online" && !upiId.trim()) {
      setError("Please enter your UPI ID.");
      return;
    }

    setIsProcessing(true);

    try {
      const id = await createOrderAction({
        user,
        items,
        paymentMode: paymentMode || "pod",
        totalAmount: totalPrice,
      });

      setOrderId(id.toString());

      // Clear states
      clearCart();
      clearUser();

      setTimeout(() => router.push("/"), 1200);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while placing the order.");
    }

    setIsProcessing(false);
  }

  // -----------------------------------------------------
  // Render UI
  // -----------------------------------------------------
  return (
    <>
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>

        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

        <div className="space-y-4">
          <button
            onClick={() => openModal("pod")}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-left px-4 flex justify-between items-center"
          >
            <span className="font-medium">Pay on Delivery</span>
            <span>💵</span>
          </button>

          <button
            onClick={() => openModal("online")}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-left px-4 flex justify-between items-center"
          >
            <span className="font-medium">Pay Now (UPI)</span>
            <span>📱</span>
          </button>
        </div>
      </div>

      {/* -------------- MODAL ---------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600"
            >
              ✕
            </button>

            {error && (
              <p className="text-red-500 text-center mb-3 text-sm">{error}</p>
            )}

            {!orderId ? (
              <>
                {paymentMode === "pod" && (
                  <div className="text-center space-y-4">
                    <h2 className="text-2xl font-semibold">
                      Confirm Pay-on-Delivery Order
                    </h2>

                    <p className="text-gray-600">Pay when food arrives.</p>

                    <button
                      onClick={handleConfirm}
                      className="w-full py-3 bg-indigo-600 text-white rounded-lg"
                    >
                      {isProcessing ? "Placing..." : "Confirm Order"}
                    </button>
                  </div>
                )}

                {paymentMode === "online" && (
                  <div className="text-center space-y-4">
                    <h2 className="text-xl font-semibold">Scan & Pay</h2>

                    <div className="w-40 h-40 mx-auto bg-gray-200 flex items-center justify-center rounded-lg">
                      <span className="text-sm">QR CODE</span>
                    </div>

                    <input
                      placeholder="Enter your UPI ID"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                    />

                    <button
                      onClick={handleConfirm}
                      className="w-full py-3 bg-indigo-600 text-white rounded-lg"
                    >
                      {isProcessing ? "Processing..." : "Confirm Payment"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-semibold">Order Placed!</h2>
                <p className="text-gray-600">Order ID: {orderId}</p>
                <p className="text-gray-500">Redirecting...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
