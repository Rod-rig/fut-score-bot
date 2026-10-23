import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@l/auth";
import { RegisterForm } from "./Form";

export const metadata = {
  title: "Register | FutScore",
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return <RegisterForm />;
}
