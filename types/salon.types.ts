import { Applications } from "./application.types";

export type Salon = {
  key: string;
  token: string;
  owner: string;
  applications: Applications[];
};
