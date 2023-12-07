"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function NotFoundPage() {
  // редирект на главную, если страницы не существует
  useEffect(() => {
    redirect("/");
  }, []);

  return <main></main>;
}
