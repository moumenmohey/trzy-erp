import Link from "next/link";

export default function AccessDenied() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-24">
      <h1 className="text-2xl font-semibold">Access denied</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Your account doesn&apos;t have permission to view that page.
      </p>
      <Link className="underline" href="/">
        Back to home
      </Link>
    </main>
  );
}
