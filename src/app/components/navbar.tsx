"use client";

import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";
// import { LogOut } from "lucide-react";
import LogoutButton from "@/components/ui/btn-logout";

export default function Navbar() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/dashboard">
          <div className="h-10 w-10 relative">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 5L30 15L20 25L10 15L20 5Z"
                stroke="black"
                strokeWidth="2"
                fill="white"
              />
              <path d="M20 15L30 25L20 35L10 25L20 15Z" fill="black" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      {/* <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[400px]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Feature Highlights
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Discover our most powerful features and how they can
                        help your business.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <Link href="/features/analytics" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Analytics
                    </NavigationMenuLink>
                  </Link>
                </li>
                <li>
                  <Link href="/features/automation" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Automation
                    </NavigationMenuLink>
                  </Link>
                </li>
                <li>
                  <Link href="/features/reporting" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Reporting
                    </NavigationMenuLink>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <span></span>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>About Us</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/pricing" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Pricing</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/faq" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>FAQ</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> */}

      {/* Login Button */}
      <div>
        <LogoutButton />
      </div>
    </div>
  );
}
