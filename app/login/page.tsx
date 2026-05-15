import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@l/auth";
import { LoginForm } from "./Form";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}
