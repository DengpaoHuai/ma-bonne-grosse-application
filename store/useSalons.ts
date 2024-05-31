import { Salon } from "@/types/salon.types";
import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

type UseSalons = {
  salons: Salon[];
  setSalons: (salons: Salon[]) => void;
};

const useSalons = create<UseSalons>(
  persist(
    (set) => ({
      salons: [],
      setSalons: (salons) => set({ salons }),
    }),
    {
      name: "salons-storage",
    }
  ) as StateCreator<UseSalons>
);

export default useSalons;
