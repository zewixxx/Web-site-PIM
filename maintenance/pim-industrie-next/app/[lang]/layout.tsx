import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { DICT } from "@/lib/i18n";
import { LANGS, isLang } from "@/lib/site";
import "../globals.css";

const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#970232",
};

export const metadata: Metadata = {
  applicationName: "PIM Industrie",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={DICT[lang].htmlLang} className={roboto.variable}>
      <body>
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
