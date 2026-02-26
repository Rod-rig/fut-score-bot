import Link from "next/link";
import { Button } from "@/components/ui/button";
import Flag from "@/components/custom/Flag";
import { prisma } from "@/lib/client";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id: parseInt(id) },
    include: {
      predictions: {
        orderBy: { updatedAt: "asc" },
        include: { user: true },
      },
      odd: true,
    },
  });
  return (
    <div>
      <div>{id}</div>
      {event?.flagHome && event.flagAway ? (
        <div>
          <Flag name={event?.flagHome} /> {event?.home} {event?.score}{" "}
          {event?.away} <Flag name={event?.flagAway} />
        </div>
      ) : (
        ""
      )}
      <div>ID: {event?.id}</div>
      <div>Status: {event?.status}</div>
      <div>Country: {event?.country}</div>
      <div>Tournament: {event?.tournament}</div>
      {event?.startDate && (
        <div>Start at: {new Date(event.startDate).toLocaleString()}</div>
      )}
      <div>Number of predictions: {event?.predictions.length}</div>
      <div>
        Predictions:{" "}
        {event?.predictions.map((item) => (
          <div key={item.id} className="flex items-center mb-2">
            <Button asChild variant="link" className="p-0 h-auto">
              <Link href={`/users/${item.userId}`}>
                {item.user.username ? item.user.username : item.user.firstName}
              </Link>
            </Button>
            <div className="pl-2">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
