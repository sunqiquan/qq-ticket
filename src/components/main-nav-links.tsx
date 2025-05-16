"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Dashborad", href: "/", onlyAdmin: false },
  { label: "Tickets", href: "/tickets", onlyAdmin: false },
  { label: "Users", href: "/users", onlyAdmin: true },
];

export default function MainNavLinks({ role }: { role?: string }) {
  const currentPath = usePathname();
  return (
    <div className="flex items-center gap-2">
      {links
        .filter((link) => !link.onlyAdmin || role === "ADMIN")
        .map((link) => (
          <Link
            href={link.href}
            key={link.label}
            className={`navbar-link ${
              currentPath === link.href &&
              "cursor:default text-primary/90 hover:text-primary/80"
            }`}
          >
            {link.label}
          </Link>
        ))}
    </div>
  );
}
