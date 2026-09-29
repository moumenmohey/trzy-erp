import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";
import { updateUserRole } from "./actions";

export default async function AdminPage() {
  const admin = await requireRole([Role.SUPER_ADMIN, Role.ADMIN], "/admin");
  const canEditRoles = admin.role === Role.SUPER_ADMIN;

  const users = await prisma.user.findMany({
    orderBy: { email: "asc" },
    select: { id: true, name: true, email: true, role: true },
  });

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold">Users</h1>
      <table className="w-full text-left text-sm">
        <thead className="border-b border-zinc-200 dark:border-zinc-800">
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-zinc-100 dark:border-zinc-900">
              <td className="py-2">{user.name ?? "—"}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">
                {canEditRoles && user.id !== admin.id ? (
                  <form action={updateUserRole} className="flex gap-2">
                    <input type="hidden" name="userId" value={user.id} />
                    <select
                      name="role"
                      defaultValue={user.role}
                      className="rounded border border-zinc-300 bg-transparent px-2 py-1 dark:border-zinc-700"
                    >
                      {Object.values(Role).map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="underline">
                      Save
                    </button>
                  </form>
                ) : (
                  <span className="font-mono">{user.role}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
