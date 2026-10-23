"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type AccordionItem = { question: string; answer: string };

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[rgb(var(--border))] rounded-2xl border border-[rgb(var(--border))]">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left min-h-[44px]"
            >
              <span className="font-medium text-[rgb(var(--fg))]">{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-primary-500 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <div className="px-5 pb-5 text-sm text-[rgb(var(--muted))] leading-relaxed animate-fade-in">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
