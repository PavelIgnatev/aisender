import type { Metadata } from "next";

import { SignIn } from "@clerk/nextjs";

import classes from "./page.module.css";

export const metadata: Metadata = {
  title: "Авторизация",
  description: "AiSender - авторизация",
};

const SignInPage = () => (
  <main className={classes.main}>
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </main>
);

export default SignInPage;
