import { getServerSession } from "next-auth/next";
import { prisma } from "@l/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Form from "./Form";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const id = session.user.id;
  const events = await prisma.event.findMany({
    where: {
      status: "NOT_STARTED",
      predictions: { none: { userId: { equals: id } } },
    },
    include: { odd: true, _count: { select: { predictions: true } } },
  });

  return <Form events={events} userId={id} />;
}
