import { Preference } from "./preference.types";
import { Salon } from "./salon.types";

export type User = {
  id: string;
  mail: string;
  salons: Salon[];
  preferences: Preference;
};
