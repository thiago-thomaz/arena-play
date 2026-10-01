'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { brandConfig } from '@/config/brand.config';
import {
  Compass,
  Calendar,
  Users,
  ShieldCheck,
  Building2,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Layers,
  ArrowRight,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { activePersona, setActivePersona, personas } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/app/jornada', label: 'Minha Jornada', icon: Layers, highlight: true },
    { href: '/explorar', label: 'Explorar', icon: Compass },
    { href: '/reservas', label: 'Reservas', icon: Calendar },
    { href: '/app/time', label: 'Meu Time', icon: Users },
    { href: '/provider', label: 'Área do Provider', icon: Building2 },
    { href: '/admin', label: 'Admin', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F0E]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#B8F34A] to-[#88C61D] flex items-center justify-center text-[#0B0F0E] font-black shadow-lg shadow-[#B8F34A]/20 transition-transform group-hover:scale-105">
                <span className="text-xl leading-none">▲</span>
              </div>
              <div>
                <span className="text-lg font-black tracking-wider text-white flex items-center gap-1.5">
                  {brandConfig.brandName}
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#B8F34A]/20 text-[#B8F34A] font-bold tracking-normal border border-[#B8F34A]/30">
                    SJP
                  </span>
                </span>
                <p className="text-[10px] text-gray-400 font-medium hidden sm:block leading-none -mt-0.5">
                  Sports Journey Platform
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    link.highlight
                      ? isActive
                        ? 'bg-[#B8F34A] text-[#0B0F0E] shadow-sm'
                        : 'bg-[#B8F34A]/10 text-[#B8F34A] hover:bg-[#B8F34A]/20 border border-[#B8F34A]/30'
                      : isActive
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Demo Persona Switcher (Interactive live testing for points 164, 191, 192, 193) */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#16221F] border border-white/10 hover:border-[#B8F34A]/40 transition-all text-left"
                title="Alternador de Demonstração de Jornadas"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-700 border border-[#B8F34A]/50 shrink-0">
                  <img
                    src={activePersona.avatarUrl}
                    alt={activePersona.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white leading-none">
                      {activePersona.name}
                    </span>
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded font-extrabold leading-none ${
                        activePersona.track === 'PROFISSIONAL'
                          ? 'badge-track-profissional'
                          : activePersona.track === 'COMPETIDOR'
                          ? 'badge-track-competidor'
                          : 'badge-track-casual'
                      }`}
                    >
                      {activePersona.track}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 block leading-tight">
                    {activePersona.sport}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {/* Persona Selector Dropdown */}
              {personaDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#121A18] border border-white/15 shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setPersonaDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-white/5 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8F34A] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Alternar Cenário Demo
                    </span>
                    <p className="text-[11px] text-gray-400">
                      Veja a plataforma reorganizar toda a jornada esportiva em tempo real:
                    </p>
                  </div>
                  <div className="space-y-1">
                    {personas.map((p) => {
                      const isSelected = p.id === activePersona.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => setActivePersona(p)}
                          className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-all ${
                            isSelected
                              ? 'bg-[#B8F34A]/15 border border-[#B8F34A]/40'
                              : 'hover:bg-white/5'
                          }`}
                        >
                          <img
                            src={p.avatarUrl}
                            alt={p.name}
                            className="w-8 h-8 rounded-full object-cover mt-0.5 border border-white/20 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white truncate">
                                {p.name}
                              </span>
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold ${
                                  p.track === 'PROFISSIONAL'
                                    ? 'bg-[#B8F34A]/20 text-[#B8F34A]'
                                    : p.track === 'COMPETIDOR'
                                    ? 'bg-amber-500/20 text-amber-400'
                                    : 'bg-blue-500/20 text-blue-400'
                                }`}
                              >
                                {p.track}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-300 font-medium">
                              {p.sport} · {p.level}
                            </p>
                            <p className="text-[10px] text-gray-400 truncate mt-0.5">
                              {p.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121A18] border-b border-white/10 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive
                    ? 'bg-[#B8F34A] text-[#0B0F0E]'
                    : 'text-gray-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {link.label}
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
