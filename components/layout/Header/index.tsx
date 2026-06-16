"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "@c/shared/Logo";
import { Button } from "@c/ui/button";
import { Spinner } from "@c/ui/spinner";
import { tgLog } from "@u/telegram-logger";

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

  const handleSignout = async () => {
    const user = session?.user;
    if (user) {
      await tgLog(
        `✅ *Sign out success*\nUser ID: ${user.id}\nUser: ${user.username}\nEmail: ${user.email}\nTime: ${new Date().toLocaleString()}`,
      );
    }
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Go to homepage">
            <Logo />
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
                onClick={handleSignout}
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
              {status === "loading" ? (
                <Button disabled size="sm">
                  <Spinner /> Loading profile
                </Button>
              ) : session ? (
                <div className="md:hidden items-center gap-3 flex justify-between">
                  <div className="text-sm">
                    Hello <span className="text-primary">{username}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={handleSignout}
                  >
                    Sign out
                  </Button>
                </div>
              ) : (
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
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
