'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, Sparkles } from 'lucide-react';

export function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#16221F] border border-[#B8F34A]/40 text-white shadow-2xl shadow-[#B8F34A]/10 backdrop-blur-xl">
        <div className="w-8 h-8 rounded-xl bg-[#B8F34A]/20 flex items-center justify-center text-[#B8F34A] shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <p className="text-xs font-semibold text-gray-200 leading-snug">
          {toastMessage}
        </p>
      </div>
    </div>
  );
}
