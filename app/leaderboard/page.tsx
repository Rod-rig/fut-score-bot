import { LeaderboardTable } from "./Table";
import { FilterControls } from "./FilterControls";
import { Header } from "./Header";
import { Podium } from "./Podium";
import { getUsersByFilter } from "./utils";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const params = await searchParams;
  const users = await getUsersByFilter(params.filter);

  return (
    <>
      <Header />
      <Podium users={users} filter={params.filter} />
      <FilterControls />
      <LeaderboardTable users={users} filter={params.filter} />
    </>
  );
}
