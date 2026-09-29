"use server";

import { revalidatePath } from "next/cache";
import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";

export async function updateUserRole(formData: FormData) {
  const admin = await requireRole([Role.SUPER_ADMIN], "/admin");

  const userId = formData.get("userId");
  const role = formData.get("role");
  if (typeof userId !== "string" || !Object.values(Role).includes(role as Role)) {
    throw new Error("Invalid role update");
  }
  // Admins can't change their own role, so no one can lock themselves out.
  if (userId === admin.id) throw new Error("You can't change your own role");

  await prisma.user.update({ where: { id: userId }, data: { role: role as Role } });
  revalidatePath("/admin");
}
