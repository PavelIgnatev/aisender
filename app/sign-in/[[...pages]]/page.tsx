import type { Metadata } from "next";

import { SignIn } from "@clerk/nextjs";

import classes from "./page.module.css";

export const metadata: Metadata = {
  title: "Авторизация",
  description: "AiSender - авторизация",
};

export default function SignInPage() {
  return <main className={classes.main}>
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      afterSignInUrl="/workspace"
    />
  </main>;
}
