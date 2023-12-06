"use client";

import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user, isLoaded } = useUser();

  return <main>home</main>;
}
