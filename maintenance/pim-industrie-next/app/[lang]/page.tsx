import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { DICT } from "@/lib/i18n";
import { buildMetadata } from "@/lib/meta";
import { COMPANY, COM, DE, LINKEDIN, href, isLang, publicUrl } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = DICT[lang].home;
  return buildMetadata(lang, "home", t.metaTitle, t.metaDescription);
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = DICT[lang];

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    url: publicUrl(lang, "home"),
    logo: `${COM}/medias/logo_pim_industrie_aplat.png`,
    email: COMPANY.email,
    telephone: "+33 3 88 58 62 00",
    faxNumber: "+33 3 88 58 62 10",
    foundingDate: "1961",
    sameAs: [COM, DE, LINKEDIN],
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.street,
      postalCode: COMPANY.zip,
      addressLocality: COMPANY.city,
      addressCountry: "FR",
    },
  };

  return (
    <>
      <Header lang={lang} page="home" />
      <main id="contenu">
        <section className="hero">
          <div className="hero-copy">
            <p className="kicker">{t.home.kicker}</p>
            <h1>{t.home.title}</h1>
            <p className="lead">{t.home.lead}</p>
            <div className="cta-row">
              <a className="cta" href={href(lang, "contact")}>
                {t.home.write}
              </a>
              <a className="cta ghost" href={`tel:${COMPANY.phoneHref}`}>
                {t.home.call}
              </a>
            </div>
            <div className="offers">
              <h2>{t.home.offerTitle}</h2>
              <ul>
                {t.home.offers.map((offer) => (
                  <li key={offer.title}>
                    <strong>{offer.title}</strong>
                    <span>{offer.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Aside lang={lang} />
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}
