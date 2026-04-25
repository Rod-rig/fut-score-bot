import { prisma } from "@l/prisma";
import HeroSection from "@c/layout/HeroSection";
import LeaderboardTable from "@c/layout/LeaderboardTable";

export default async function Page() {
  const usersWithResults = await prisma.user.findMany({
    include: { results: true },
    orderBy: { results: { total: "desc" } },
  });

  return (
    <>
      <HeroSection />
      <LeaderboardTable participants={usersWithResults} />
    </>
  );
}
