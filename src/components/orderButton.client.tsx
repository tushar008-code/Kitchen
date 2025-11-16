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
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Payment Method
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => openModal("pod")}
            className="w-full p-4 border border-gray-300 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors duration-200 text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Pay on Delivery</p>
                <p className="text-sm text-gray-500 mt-1">
                  Pay when food arrives
                </p>
              </div>
              <span className="text-xl">💵</span>
            </div>
          </button>

          <button
            onClick={() => openModal("online")}
            className="w-full p-4 border border-gray-300 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors duration-200 text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Pay Now (UPI)</p>
                <p className="text-sm text-gray-500 mt-1">
                  Instant UPI payment
                </p>
              </div>
              <span className="text-xl">📱</span>
            </div>
          </button>
        </div>
      </div>

      {/* -------------- MODAL ---------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {paymentMode === "pod" ? "Confirm Order" : "UPI Payment"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
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

            {/* Content */}
            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {!orderId ? (
                <>
                  {paymentMode === "pod" && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">💵</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Pay on Delivery
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Pay ₹{totalPrice.toFixed(2)} when your food arrives
                        </p>
                      </div>

                      <button
                        onClick={handleConfirm}
                        disabled={isProcessing}
                        className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-orange-400 transition-colors duration-200 font-medium"
                      >
                        {isProcessing ? (
                          <span className="flex items-center justify-center">
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
                            Placing Order...
                          </span>
                        ) : (
                          "Confirm Order"
                        )}
                      </button>
                    </div>
                  )}

                  {paymentMode === "online" && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">📱</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          UPI Payment
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Complete payment using any UPI app
                        </p>
                      </div>

                      {/* QR Code Placeholder */}
                      <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <span className="text-4xl mb-2">📲</span>
                          <p className="text-xs text-gray-500">
                            Scan with UPI app
                          </p>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="upiId"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          UPI ID
                        </label>
                        <input
                          id="upiId"
                          type="text"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        />
                      </div>

                      <button
                        onClick={handleConfirm}
                        disabled={isProcessing}
                        className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-orange-400 transition-colors duration-200 font-medium"
                      >
                        {isProcessing ? (
                          <span className="flex items-center justify-center">
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
                            Processing...
                          </span>
                        ) : (
                          `Pay ₹${totalPrice.toFixed(2)}`
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center space-y-4 py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✅</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Order Placed!
                  </h3>
                  <p className="text-sm text-gray-600">
                    Order ID:{" "}
                    <span className="font-mono text-orange-600">{orderId}</span>
                  </p>
                  <p className="text-gray-500 text-sm">
                    Redirecting to homepage...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
