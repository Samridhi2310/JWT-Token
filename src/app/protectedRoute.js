"use client";
import { useEffect} from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route
  useEffect(() => {
  const token = localStorage.getItem("jwtToken");
    if (!token) {
      // Prevent redirect loop by checking if already on /dashboard
      if (pathname !== "/") {
        router.replace("/");
      }
    } 
  }, [router, pathname]);
  if (pathname !== "/") return null;
  return <>{children}</>;
}
