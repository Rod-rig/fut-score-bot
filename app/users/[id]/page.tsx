import Link from "next/link";
import { Button } from "@c/ui/button";
import Flag from "@c/shared/Flag";
import { prisma } from "@l/prisma";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      predictions: {
        orderBy: { createdAt: "desc" },
        include: {
          event: {
            include: {
              odd: true,
            },
          },
        },
      },
    },
  });
  return (
    <div>
      <div>{user?.id}</div>
      <div>{user?.firstName}</div>
      <div>{user?.lastName}</div>
      <div>{user?.role}</div>
      <div>
        {user?.predictions.map((prediction) => (
          <div className="flex items-center mb-2" key={prediction.id}>
            <Button asChild variant="link">
              <Link href={`/events/${prediction.eventId}`}>
                {prediction.eventId}
              </Link>
            </Button>
            <div>{prediction.event.tournament}</div>
            <div className="flex items-center">
              <div className="px-2">
                <Flag name={prediction.event.flagHome} />
              </div>
              <div>{prediction.event.home}</div>
              <div className="px-2">{prediction.event.score}</div>
              <div>{prediction.event.away}</div>
              <div className="px-2">
                <Flag name={prediction.event.flagAway} />
              </div>
              <div>{prediction.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
