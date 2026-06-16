import { Prisma } from "@prisma/client";
import { select } from "./constants";

export type User = Prisma.UserGetPayload<typeof select>;
