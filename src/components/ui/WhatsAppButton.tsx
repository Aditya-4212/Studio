"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function WhatsAppButton() {
  const message = encodeURIComponent("Hi! I'd like to know more about your services.");
  return (
    <a
      href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full
        bg-[#25D366] text-white shadow-soft transition-transform hover:scale-105 active:scale-95"
    >
      <MessageCircle className="h-6 w-6" fill="white" />
    </a>
  );
}
