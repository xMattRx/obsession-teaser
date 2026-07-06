import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({ variable: "--font-display", subsets: ["latin"], weight: "400" });
const inter = Inter({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OBSESSION | Cuidado com o que você deseja",
  description: "Um fã-site interativo para o filme de terror Obsession, de Curry Barker.",
};

// viewportFit: "cover" habilita as env(safe-area-inset-*) para não sobrepor a
// notch/área segura no iOS. themeColor casa com o fundo preto da hero.
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
