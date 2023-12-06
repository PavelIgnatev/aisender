import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req, evt) {

    if (auth.userId && req.nextUrl.pathname === "/sign-in") {
      const orgSelection = new URL("/", req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
  };