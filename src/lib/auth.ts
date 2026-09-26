import type { AuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  // @auth/prisma-adapter targets @auth/core types; cast for next-auth v4.
  adapter: PrismaAdapter(prisma) as Adapter,
  // Providers (OAuth, email, credentials) will be added as IAM is built out.
  providers: [],
  session: { strategy: "database" },
};
