import type { Metadata } from "next";

import { ViewUsersIdContainer } from "@/widgets/view-users-id/view-users-id.container";

import classes from "./page.module.css";

export const metadata: Metadata = {
  title: "Информация о пользователе",
  description: "Информация о пользователе",
};

export default function AdminUsersPage() {
  return (
    <main className={classes.main}>
      <ViewUsersIdContainer />
    </main>
  );
}
