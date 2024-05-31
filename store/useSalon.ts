"use client";
import { create } from "zustand";

type UseSalon = {
  salonId: string;
  switchSalon: (salonId: string) => void;
};

const useSalon = create<UseSalon>((set) => ({
  salonId: "",
  switchSalon: (salonId: string) => set({ salonId }),
}));

export default useSalon;
