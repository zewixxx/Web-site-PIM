export const LANGS = ["fr", "en", "de"] as const;
export type Lang = (typeof LANGS)[number];

export type PageKey = "home" | "contact" | "legal";

export const COM = "https://www.pim-industrie.com";
export const DE = "https://www.pim-industrie.de";
export const LINKEDIN = "https://www.linkedin.com/company/pim-industrie.com/";

/**
 * Coordonnées de l'entreprise.
 * Les champs "legal.*" laissés vides ne sont pas affichés sur la page des mentions légales.
 * Renseignez-les (forme juridique, SIRET, TVA, directeur de publication) avant mise en ligne
 * si vous souhaitez une page 100 % conforme.
 */
export const COMPANY = {
  name: "PIM Industrie",
  email: "info@pim-industrie.com",
  phoneDisplay: "03 88 58 62 00",
  phoneHref: "+33388586200",
  faxDisplay: "03 88 58 62 10",
  street: "Impasse Kohlgaerten",
  zip: "67390",
  city: "Marckolsheim",
  legal: {
    form: "",
    capital: "",
    siret: "",
    vat: "",
    publisher: "",
  },
  host: {
    name: "OVH SAS",
    address: "2 rue Kellermann, 59100 Roubaix, France",
    phone: "+33 9 72 10 10 07",
    web: "www.ovhcloud.com",
  },
} as const;

/** Adresse publique de chaque langue (domaine + dossier). */
export const ORIGIN: Record<Lang, string> = {
  fr: `${COM}/fr`,
  en: `${COM}/en`,
  de: DE,
};

/** Nom du dossier de chaque page, par langue. */
export const SLUGS: Record<Lang, Record<Exclude<PageKey, "home">, string>> = {
  fr: { contact: "contact", legal: "mentions-legales" },
  en: { contact: "contact", legal: "legal-notice" },
  de: { contact: "kontakt", legal: "impressum" },
};

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/** Chemin interne (tel qu'exporté dans le dossier out) : /fr/contact/ */
export function internalPath(lang: Lang, page: PageKey): string {
  return page === "home" ? `/${lang}/` : `/${lang}/${SLUGS[lang][page]}/`;
}

/** URL publique absolue : https://www.pim-industrie.de/kontakt/ */
export function publicUrl(lang: Lang, page: PageKey): string {
  const tail = page === "home" ? "/" : `/${SLUGS[lang][page]}/`;
  return `${ORIGIN[lang]}${tail}`;
}

/**
 * Lien utilisé dans le site. En production : URL absolue, ce qui garantit que le changement
 * de langue renvoie vers le bon domaine. En développement local : lien relatif.
 */
export function href(lang: Lang, page: PageKey): string {
  return process.env.NODE_ENV === "development" ? internalPath(lang, page) : publicUrl(lang, page);
}

/** Pages qui existent réellement (utilisé par generateStaticParams). */
export function slugParams(): { lang: Lang; slug: string }[] {
  return LANGS.flatMap((lang) =>
    (Object.keys(SLUGS[lang]) as (keyof (typeof SLUGS)[Lang])[]).map((key) => ({
      lang,
      slug: SLUGS[lang][key],
    })),
  );
}

export function pageFromSlug(lang: Lang, slug: string): Exclude<PageKey, "home"> | null {
  const entry = Object.entries(SLUGS[lang]).find(([, value]) => value === slug);
  return entry ? (entry[0] as Exclude<PageKey, "home">) : null;
}

/** Ouvrir à l'indexation par les moteurs de recherche. Mettre false pour garder le site en noindex. */
export const INDEXABLE = true;
