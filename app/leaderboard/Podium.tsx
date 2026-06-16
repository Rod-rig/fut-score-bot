import { Trophy, Medal } from "lucide-react";
import { getUserInitials } from "@u/getUserInitials";
import { getPoints } from "./utils";
import { User } from "./types";

export const Podium = ({
  users,
  filter,
}: {
  users: User[];
  filter?: string;
}) => {
  if (!users || users.length < 3) return null;

  const p1Points = getPoints(users[0], filter);
  const p2Points = getPoints(users[1], filter);
  const p3Points = getPoints(users[2], filter);

  return (
    <div className="mb-12 flex items-end justify-center gap-4">
      {/* 2nd Place */}
      <div className="flex flex-col items-center">
        <div className="mb-2 flex h-8 sm:h-16 w-8 sm:w-16 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-secondary-foreground">
          {getUserInitials(users[1].firstName, users[1].lastName)}
        </div>
        <p className="font-medium text-foreground">
          {users[1].username ? users[1].username : users[1].firstName}
        </p>
        <p className="text-sm text-primary">{p2Points} pts</p>
        <div className="mt-4 flex h-24 w-18 sm:w-24 items-center justify-center rounded-t-xl bg-linear-to-t from-gray-500/20 to-gray-400/30">
          <Medal className="h-8 w-8 text-gray-400" />
        </div>
      </div>

      {/* 1st Place */}
      <div className="flex flex-col items-center">
        <div className="mb-2 flex h-10 sm:h-20 w-10 sm:w-20 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground">
          {getUserInitials(users[0].firstName, users[0].lastName)}
        </div>
        <p className="font-medium text-foreground">
          {users[0].username ? users[0].username : users[0].firstName}
        </p>
        <p className="text-sm text-primary">{p1Points} pts</p>
        <div className="mt-4 flex h-32 w-21 sm:w-28 items-center justify-center rounded-t-xl bg-linear-to-t from-yellow-500/20 to-yellow-400/30">
          <Trophy className="h-10 w-10 text-yellow-500" />
        </div>
      </div>

      {/* 3rd Place */}
      <div className="flex flex-col items-center">
        <div className="mb-2 flex h-8 sm:h-16 w-8 sm:w-16 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-secondary-foreground">
          {getUserInitials(users[2].firstName, users[2].lastName)}
        </div>
        <p className="font-medium text-foreground">
          {users[2].username ? users[2].username : users[2].firstName}
        </p>
        <p className="text-sm text-primary">{p3Points} pts</p>
        <div className="mt-4 flex h-20 w-18 sm:w-24 items-center justify-center rounded-t-xl bg-linear-to-t from-amber-600/20 to-amber-500/30">
          <Medal className="h-8 w-8 text-amber-600" />
        </div>
      </div>
    </div>
  );
};
