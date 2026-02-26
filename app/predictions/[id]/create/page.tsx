import { prisma } from "@/lib/client";
import Form from "./Form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const events = await prisma.event.findMany({
    where: {
      status: "NOT_STARTED",
      predictions: { none: { userId: { equals: id } } },
    },
    include: { odd: true },
  });

  return events.length > 0 ? (
    <Form events={events} userId={id} />
  ) : (
    <div>Predictions are not available now. Please come back later</div>
  );
}
