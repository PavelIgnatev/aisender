import type { Metadata } from "next";

import { ViewUsersContainer } from "@/widgets/view-users/view-users.container";

import classes from "./page.module.css";

export const metadata: Metadata = {
  title: "Все пользователи",
  description: "Все пользователи",
};

export default function AdminUsersPage() {
  return (
    <main className={classes.main}>
      <ViewUsersContainer />
    </main>
  );
}
