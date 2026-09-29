import Link from "next/link";
import { getCurrentUser } from "@/lib/session";

const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN"];

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">TRZY ERP</h1>

      {user ? (
        <>
          <p className="text-zinc-600 dark:text-zinc-400">
            Signed in as <span className="font-medium">{user.email}</span> ·{" "}
            <span className="font-mono text-sm">{user.role}</span>
          </p>
          <div className="flex gap-4">
            {ADMIN_ROLES.includes(user.role) && (
              <Link className="underline" href="/admin">
                Admin
              </Link>
            )}
            <Link className="underline" href="/api/auth/signout">
              Sign out
            </Link>
          </div>
        </>
      ) : (
        <Link className="underline" href="/api/auth/signin">
          Sign in with Google
        </Link>
      )}
    </main>
  );
}
