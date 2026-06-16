import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { Trophy, Medal } from "lucide-react";
import { getUserInitials } from "@u/getUserInitials";
import { authOptions } from "@l/auth";
import { getPoints } from "./utils";
import { User } from "./types";

function getPositionIcon(position: number) {
  if (position === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
  if (position === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (position === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return <span>{position}</span>;
}

export const LeaderboardTable = async ({
  users,
  filter,
}: {
  users: User[];
  filter?: string;
}) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const checkCurrentUser = (id: string) => userId === id;

  return (
    <div className="overflow-hidden rounded-xl border border-border/40 bg-card/50">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-4 font-medium w-20">Position</th>
              <th className="px-6 py-4 font-medium">Participant</th>
              <th className="px-6 py-4 font-medium text-center">Predictions</th>
              <th className="px-6 py-4 font-medium text-center">
                Prev Gameweek
              </th>
              <th className="px-6 py-4 font-medium text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {users.map((user, index) => {
              const isCurrentUser = checkCurrentUser(user.id);
              const points = getPoints(user, filter);

              return (
                <tr
                  key={index + 1}
                  className={`transition-colors ${
                    isCurrentUser
                      ? "bg-primary/10 hover:bg-primary/15"
                      : "hover:bg-primary/5"
                  }`}
                >
                  <td className="px-6 py-4">
                    <span
                      className={`flex h-8 w-8 items-center justify-center text-sm font-medium ${isCurrentUser ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {getPositionIcon(index + 1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/users/${user.id}`}
                      className="flex items-center gap-3 hover:text-primary"
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-md text-xs font-medium ${
                          isCurrentUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {getUserInitials(user.firstName, user.lastName)}
                      </div>
                      <span
                        className={`font-medium ${isCurrentUser ? "text-primary" : "text-foreground"}`}
                      >
                        {user.username ? user.username : user.firstName}
                        {isCurrentUser && (
                          <span className="ml-2 text-xs text-primary">
                            (You)
                          </span>
                        )}
                      </span>
                    </Link>
                  </td>
                  <td
                    className={`px-6 py-4 text-center ${isCurrentUser ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {user._count.predictions ?? 0}
                  </td>
                  <td
                    className={`px-6 py-4 text-center ${isCurrentUser ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {user?.results?.prevMatchday}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-primary">
                    {points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
