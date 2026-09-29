import { cache } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import type { Role } from "@/generated/prisma/enums";
import { authOptions } from "@/lib/auth";

export const getCurrentUser = cache(async () => {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
});

// Sends signed-out visitors to sign in, then back to `callbackUrl`.
export async function requireUser(callbackUrl = "/") {
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }
  return user;
}

export async function requireRole(roles: Role[], callbackUrl = "/") {
  const user = await requireUser(callbackUrl);
  if (!roles.includes(user.role)) redirect("/access-denied");
  return user;
}
