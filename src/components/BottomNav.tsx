'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Layers, Calendar, User } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const items = [
    { href: '/', label: 'Início', icon: Home },
    { href: '/explorar', label: 'Explorar', icon: Compass },
    { href: '/app/jornada', label: 'Jornada', icon: Layers, isCenter: true },
    { href: '/reservas', label: 'Reservas', icon: Calendar },
    { href: '/app/time', label: 'Time', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0B0F0E]/95 backdrop-blur-xl border-t border-white/10 px-2 py-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-3 flex flex-col items-center group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-[#B8F34A] text-[#0B0F0E] shadow-lg shadow-[#B8F34A]/30 scale-105'
                      : 'bg-[#16221F] text-[#B8F34A] border border-[#B8F34A]/40'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-white mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-[#B8F34A]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-medium leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
