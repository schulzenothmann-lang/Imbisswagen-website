import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ACCESS_COOKIE_NAME } from "@/lib/access";

export const metadata: Metadata = {
  title: "MINO — bald verfügbar",
  robots: { index: false, follow: false },
};

function isSafeNextPath(value: FormDataEntryValue | null): value is string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//");
}

async function unlock(formData: FormData) {
  "use server";

  const password = formData.get("password");
  const nextParam = formData.get("next");
  const target = isSafeNextPath(nextParam) ? nextParam : "/";
  const expected = process.env.SITE_PASSWORD;

  if (expected && password === expected) {
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_COOKIE_NAME, expected, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect(target);
  }

  redirect(`/warteraum?error=1&next=${encodeURIComponent(target)}`);
}

export default async function WarteraumPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const next = params.next && params.next.startsWith("/") ? params.next : "/";
  const hasError = params.error === "1";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-beton px-6 text-graphit">
      <div className="w-full max-w-sm text-center">
        <h1 className="font-serif text-3xl">MINO</h1>
        <p className="mt-3 font-sans text-sm text-graphit/70">
          Wir bauen gerade an unserer neuen Website. Wenn du schon reinschauen darfst, gib das Passwort ein.
        </p>

        <form action={unlock} className="mt-8 flex flex-col gap-3">
          <input type="hidden" name="next" value={next} />
          <input
            type="password"
            name="password"
            required
            autoFocus
            placeholder="Passwort"
            className="h-12 w-full rounded-sm border border-graphit/15 bg-kreide px-4 text-center font-sans text-sm text-graphit outline-none transition-colors focus:border-graphit/50"
          />
          {hasError && (
            <p className="font-sans text-sm text-destructive">Falsches Passwort, bitte erneut versuchen.</p>
          )}
          <Button type="submit" size="lg" className="mt-1">
            Freischalten
          </Button>
        </form>
      </div>
    </main>
  );
}
