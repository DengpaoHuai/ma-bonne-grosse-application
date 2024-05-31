"use server"; // don't forget to add this!

import { z } from "zod";
import { action } from "@/lib/safe-action";
import loginUser from "@/services/auth.services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// This schema is used to validate input from client.
const schema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(8).max(100),
});

export const loginUserAction = action(
  schema,
  async ({ username, password }) => {
    console.log("username");

    const user = await loginUser({
      username,
      password,
    });
    const sessionData = {
      userId: user.id,
      username: user.mail,
    };
    const encryptedSessionData = JSON.stringify(sessionData); // Encrypt your session data
    cookies().set("session", encryptedSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    });

    return { data: user };
  }
);
