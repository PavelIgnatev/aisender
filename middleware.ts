import { NextResponse } from "next/server";

import { authMiddleware } from "@clerk/nextjs";

const regExpSignIn = /^\/sign-in(\/.*)?$/;
const regExpSignUp = /^\/sign-up(\/.*)?$/;

export default authMiddleware({
  publicRoutes: ["/", regExpSignIn, regExpSignUp],
  afterAuth(auth, req, evt) {
    if (
      auth.userId &&
      (regExpSignIn.test(req.nextUrl.pathname) ||
        regExpSignUp.test(req.nextUrl.pathname))
    ) {
      const orgSelection = new URL("/workspace", req.url);
      return NextResponse.redirect(orgSelection);
    }

    if (!auth.userId && !auth.isPublicRoute) {
      const orgSelection = new URL("/sign-in", req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
