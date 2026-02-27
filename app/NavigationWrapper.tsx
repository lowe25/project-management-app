"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/src/layouts/Navbar";
import Footer from "@/src/layouts/Footer";

interface Props {
  children: ReactNode;
}

export default function NavigationWrapper({ children }: Props) {
  const pathname = usePathname();

  // when pathname isn't ready yet, avoid showing navigation
  if (pathname === undefined || pathname === null) {
    // path not hydrated yet
    return <>{children}</>;
  }

  // hide on login, signup or the root path (homepage doubles as login)
  // match exactly "/" or any path beginning with "/login" or "/signup"
  const hideNav =
    pathname === "/" ||
    pathname.toLowerCase().startsWith("/login") ||
    pathname.toLowerCase().startsWith("/signup");

  // debugging output - check browser console to see what pathname is
  if (process.env.NODE_ENV === "development") {
    console.log("NavigationWrapper", { pathname, hideNav });
  }

  return (
    <>
      {!hideNav && <Navbar />}

      {children}

      {!hideNav && <Footer />}
    </>
  );
}
