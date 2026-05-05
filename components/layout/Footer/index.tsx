import Link from "next/link";
import { Trophy } from "lucide-react";
import Logo from "@c/shared/Logo";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card shrink-0">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" aria-label="Go to homepage">
              <Logo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The ultimate platform for football match predictions. Compete with
              friends and climb to the top of the leaderboard!
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/create-predictions"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Matches
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Information
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/rules"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Rules
                </Link>
              </li>
              {/*<li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Contact
                </Link>
              </li>*/}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              {/*<li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>*/}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border/50 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FutScore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
