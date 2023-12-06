"use client";

import { ReactNode, useState } from "react";
import { config as dotenvConfig } from "dotenv";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/nextjs";
import { ruRU } from "@/constants/localizationClerk";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";

dotenvConfig();

export default function Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        appearance={{
          elements: {
            formButtonPrimary: {
              fontSize: 14,
              textTransform: "none",
              backgroundColor: "#611BBD",
              "&:hover, &:focus, &:active": {
                backgroundColor: "#49247A",
              },
            },
          },
        }}
        localization={ruRU}
      >
        {children}
      </ClerkProvider>
    </QueryClientProvider>
  );
}
