"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Prototipo DIAN" },
  { href: "/growth", label: "Jugadas de growth" },
  { href: "/andres", label: "Por qué yo" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-line/70 bg-white/75 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
        <span className="font-display text-lg font-semibold text-navy">
          Clara <span className="font-normal text-muted">× Andrés</span>
        </span>
        <nav className="flex gap-1 rounded-full bg-subtle p-1 text-sm">
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`pressable rounded-full px-3 py-1.5 whitespace-nowrap sm:px-4 ${
                  active ? "bg-white font-medium text-navy shadow-sm" : "text-muted hover:text-navy"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
