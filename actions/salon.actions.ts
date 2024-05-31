"use server"; // don't forget to add this!

import { z } from "zod";
import { action } from "@/lib/safe-action";
import loginUser from "@/services/auth.services";
import { cookies } from "next/headers";

// This schema is used to validate input from client.
const schema = z.object({
  salonId: z.string().min(3).max(150),
});

export const switchSalonAction = action(schema, async ({ salonId }) => {
  console.log("username");

  const currentSession = cookies().get("session");
  const sessionData = currentSession && JSON.parse(currentSession.value);
  if (currentSession) {
    const newSession = {
      userId: sessionData.userId,
      username: sessionData.username,
      salonId: salonId,
    };
    const encryptedSessionData = JSON.stringify(newSession); // Encrypt your session data
    cookies().set("session", encryptedSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    });
    return {
      data: "ok",
    };
  }

  return { error: "true" };
});
