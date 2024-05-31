import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = () => {
  const session = cookies().get("session");
  let sessionData = session?.value && JSON.parse(session.value);
  return NextResponse.json(sessionData);
};
