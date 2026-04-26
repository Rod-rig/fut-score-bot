"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Trophy, Menu, X } from "lucide-react";
import { Button } from "@c/ui/button";
import { Spinner } from "@c/ui/spinner";

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const username = session?.user?.username;

  const links = [
    { href: "/", label: "Home" },
    { href: "/create-predictions", label: "Matches" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/rules", label: "Rules" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Fut<span className="text-primary">Score</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium text-${isActive ? "" : "muted-"}foreground transition-colors hover:text-primary`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Auth Buttons */}
          {status === "loading" ? (
            <Button disabled size="sm">
              <Spinner /> Loading profile
            </Button>
          ) : session ? (
            <div className="hidden items-center gap-3 md:flex">
              <div className="text-sm">
                Hello <span className="text-primary">{username}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Button
                asChild
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="flex items-center justify-center md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border/50 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium text-${isActive ? "" : "muted-"}foreground transition-colors hover:text-primary`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 pt-4">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-center text-muted-foreground"
                >
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground"
                >
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
