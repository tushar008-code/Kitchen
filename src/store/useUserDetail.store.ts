import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserDetails {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  pincode: string;
}

interface UserDetailsState {
  user: UserDetails;
  updateField: (key: keyof UserDetails, value: string) => void;
  setAll: (data: Partial<UserDetails>) => void;
  clear: () => void;
}

export const useUserDetail = create<UserDetailsState>()(
  persist(
    (set) => ({
      user: {
        name: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        pincode: "",
      },

      updateField: (key, value) =>
        set((state) => ({
          user: {
            ...state.user,
            [key]: key === "phone" ? String(value) : value,
          },
        })),

      setAll: (data) =>
        set((state) => ({
          user: { ...state.user, ...data },
        })),

      clear: () =>
        set({
          user: {
            name: "",
            phone: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            pincode: "",
          },
        }),
    }),
    {
      name: "checkout-user-details",
    }
  )
);
