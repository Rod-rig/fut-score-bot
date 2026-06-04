import { prisma } from "@l/prisma";
import HeroSection from "@c/layout/HeroSection";
import LeaderboardTable from "@c/layout/LeaderboardTable";

export default async function Page() {
  const users = await prisma.user.findMany({
    include: { results: true, predictions: true },
    orderBy: { results: { total: "desc" } },
    take: 10,
  });

  return (
    <>
      <HeroSection />
      <LeaderboardTable participants={users} />
    </>
  );
}
