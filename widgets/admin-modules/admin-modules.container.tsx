"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

import { useUser } from "@clerk/nextjs";

import { AdminModules } from "./admin-modules";

export const AdminModulesContainer = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (user && isLoaded) {
      const { isSuperAdmin, isAdmin, isManager } = user.publicMetadata;

      if (!isSuperAdmin && !isAdmin && !isManager) {
        redirect("/workspace");
      }
    }
  }, [user, isLoaded]);

  return <AdminModules />;
};
