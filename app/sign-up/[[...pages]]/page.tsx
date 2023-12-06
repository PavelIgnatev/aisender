import type { Metadata } from "next";

import { SignUp } from "@clerk/nextjs";

import "public/static/css/normalize.css";

import classes from "./page.module.css";

export const metadata: Metadata = {
  title: "Создние нового аккаунта",
  description: "AiSender - создние нового аккаунта",
};

const SignUpPage = () => (
  <main className={classes.main}>
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </main>
);
export default SignUpPage;
