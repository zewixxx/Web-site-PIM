import type { Metadata } from "next";
import { DICT } from "./i18n";
import { COM, INDEXABLE, LANGS, publicUrl, type Lang, type PageKey } from "./site";

export function buildMetadata(lang: Lang, page: PageKey, title: string, description: string): Metadata {
  const url = publicUrl(lang, page);
  const languages: Record<string, string> = {};
  for (const code of LANGS) languages[code] = publicUrl(code, page);
  languages["x-default"] = page === "home" ? `${COM}/` : publicUrl("en", page);

  return {
    metadataBase: new URL(url),
    title,
    description,
    alternates: { canonical: url, languages },
    robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName: "PIM Industrie",
      title,
      description,
      url,
      locale: DICT[lang].locale,
    },
    twitter: { card: "summary", title, description },
    icons: { icon: "/medias/favicon.svg" },
  };
}
