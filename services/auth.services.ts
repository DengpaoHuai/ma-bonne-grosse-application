import { LoginSchema } from "@/schemas/login.schema";
import { User } from "@/types/user.types";
import { env } from "process";

const loginUser = async ({ username, password }: LoginSchema) => {
  console.log(username);
  const response = await fetch(env.URL + "/Users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UserId: username,
      password,
    }),
  });
  const data: User = await response.json();
  console.log(data);
  return data;
};

export default loginUser;
