import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  return user;
};

export default getData;
