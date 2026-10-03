import type { Metadata } from "next";
import { Quicksand, Fredoka } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://playzulo.vercel.app"),
  title: "PlayZulo | Jogos educativos e calmos para crianças",
  description: "Jogos gratuitos de baixa estimulação para crianças de 1 a 5 anos. Sem anúncios, sem barulho, apenas diversão e aprendizado.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PlayZulo | Jogos educativos e calmos para crianças",
    description: "Jogos gratuitos de baixa estimulação para crianças de 1 a 5 anos, sem anúncios e sem estímulos agressivos.",
    url: "/",
    siteName: "PlayZulo",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${quicksand.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
