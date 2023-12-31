import type { Metadata } from "next";

import Provider from "@/utils/Providers";
import { HeaderContainer } from "@/widgets/header/header.container";

import "public/static/css/normalize.css";

export const metadata: Metadata = {
  title: "AiSender - aвтоматизация первой линии продаж на основе Ai",
  description: "Автоматизация первой линии продаж на основе Ai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <Provider>
        <body suppressHydrationWarning={true}>
          <HeaderContainer />
          {children}
        </body>
      </Provider>
    </html>
  );
}
