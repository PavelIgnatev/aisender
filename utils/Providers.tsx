"use client";

import { ReactNode, useState } from "react";
import { config as dotenvConfig } from "dotenv";
import { ConfigProvider } from "antd";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/nextjs";
import { ruRU } from "@/constants/localizationClerk";

dotenvConfig();

export default function Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <ClerkProvider localization={ruRU}>{children}</ClerkProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
