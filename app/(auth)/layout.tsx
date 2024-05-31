"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardProvider from "./DashboardProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const session = cookies().get("session");
  let sessionData = session && JSON.parse(session.value);
  console.log(sessionData);

  if (!sessionData) {
    redirect("/login");
  }

  return <DashboardProvider>{children}</DashboardProvider>;
};

export default Layout;
