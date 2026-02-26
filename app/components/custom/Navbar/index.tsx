"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { data: session, status } = useSession();
  const id = session?.user?.id;
  const username = session?.user?.username;
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {status === "loading" ? (
          "Loading..."
        ) : session ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href={`/predictions/${id}/create`}>Send prediction</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>Hello {username}</NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                variant="ghost"
              >
                Sign out
              </Button>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/login">Sign in</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/register">Sign up</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
