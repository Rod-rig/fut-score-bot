import Link from "next/link";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/client";

export default async function Page() {
  const usersWithResults = await prisma.user.findMany({
    include: { results: true },
    orderBy: { results: { total: "desc" } },
  });

  return (
    <UITable>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersWithResults.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Button asChild variant="link" className="p-0">
                <Link href={`/users/${user.id}`}>
                  {user.username
                    ? user.username
                    : `${user.firstName} ${user.lastName}`}
                </Link>
              </Button>
            </TableCell>
            <TableCell>{user.results?.total ?? 0}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </UITable>
  );
}
