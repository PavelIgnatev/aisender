"use client";

import { useUser } from "@clerk/nextjs";

import { Header } from "./header";

export const HeaderContainer = () => {
  const { user, isLoaded } = useUser();
  const isLogin = Boolean(user && isLoaded);

  return <Header isLogin={isLogin} href={isLogin ? "/workspace" : "/"} />;
};
