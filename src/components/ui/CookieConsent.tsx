"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem("cookie-consent");
    if (!consent) setShow(true);
  }, []);

  const accept = (value: "accepted" | "rejected") => {
    window.localStorage.setItem("cookie-consent", value);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 sm:p-5 shadow-soft"
    >
      <div className="container-page flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-[rgb(var(--muted))]">
          We use cookies to improve your experience and analyze site traffic. Read our{" "}
          <Link href="/privacy-policy" className="underline hover:text-primary-500">
            Privacy Policy
          </Link>{" "}
          to learn more.
        </p>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => accept("rejected")} className="btn-outline text-xs px-4 py-2">
            Decline
          </button>
          <button onClick={() => accept("accepted")} className="btn-primary text-xs px-4 py-2">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
