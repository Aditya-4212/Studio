import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <div className="container-page text-center max-w-md">
        <p className="text-8xl font-display font-semibold text-primary-500">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-[rgb(var(--fg))]">Page not found</h1>
        <p className="mt-3 text-[rgb(var(--muted))]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          <Home className="h-4 w-4" /> Back to Home <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
