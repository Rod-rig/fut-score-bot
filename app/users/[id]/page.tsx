import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";
import UserProfileStats from "@c/users/UserProfileStats";
import UserPredictionsTable from "@c/users/UserPredictionsTable";
import UserRoiChart from "@c/users/UserRoiChart";
import { prisma } from "@l/prisma";
import { getUserInitials } from "@u/getUserInitials";

type UserWithPredictions = Prisma.UserGetPayload<{
  include: {
    predictions: { include: { event: { include: { odd: true } } } };
    results: true;
  };
}>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: { firstName: true, lastName: true },
  });

  const name = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "User Profile";

  return {
    title: `${name} | FutScore`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user: UserWithPredictions | null = await prisma.user.findUnique({
    where: { id },
    include: {
      predictions: {
        where: { event: { score: { not: null } } },
        orderBy: { createdAt: "desc" },
        include: { event: { include: { odd: true } } },
      },
      results: true,
    },
  });

  if (!user) {
    notFound();
  }

  const count = await prisma.prediction.count({ where: { userId: id } });

  return (
    <>
      <div className="mb-8 rounded-xl border border-border/40 bg-card/50 sm:p-8 p-2">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2 sm:gap-6">
            <div className="flex h-18 sm:h-24 w-18 sm:w-24 items-center justify-center rounded-2xl bg-primary text-3xl font-bold text-primary-foreground">
              {getUserInitials(user?.firstName ?? "", user?.lastName ?? "")}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {user?.firstName} {user?.lastName}
                </h1>
              </div>
              <p className="mt-1 text-muted-foreground">
                {/* @ts-ignore */}
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
              {Boolean(user?.results) && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {user?.results?.total}
                  </span>
                  <span className="text-muted-foreground">points</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <UserProfileStats user={user} count={count} />

      {user.predictions.length > 0 && (
        <>
          <UserRoiChart
            predictions={user.predictions}
            currentRoi={user.results?.roi ?? 0}
          />
          <UserPredictionsTable predictions={user.predictions} count={count} />
        </>
      )}
    </>
  );
}
