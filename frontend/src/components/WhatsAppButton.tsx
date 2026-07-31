'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '18005555864';
  const defaultText = encodeURIComponent('Hello Lumina Dental Studio! I would like to inquire about a luxury smile consultation.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${defaultText}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 hover:scale-110 transition-all flex items-center justify-center border border-white/20 group"
      title="Chat on WhatsApp Concierge"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 text-xs font-bold pl-0 group-hover:pl-2">
        WhatsApp Concierge
      </span>
    </a>
  );
}
