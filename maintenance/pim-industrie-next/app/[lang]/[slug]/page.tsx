import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Aside from "@/components/Aside";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import { DICT } from "@/lib/i18n";
import { buildMetadata } from "@/lib/meta";
import { COMPANY, href, isLang, pageFromSlug, slugParams, type Lang } from "@/lib/site";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return slugParams();
}

async function resolve(params: Props["params"]) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const page = pageFromSlug(lang, slug);
  if (!page) notFound();
  return { lang, page };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, page } = await resolve(params);
  const t = DICT[lang][page];
  return buildMetadata(lang, page, t.metaTitle, t.metaDescription);
}

export default async function InnerPage({ params }: Props) {
  const { lang, page } = await resolve(params);
  return page === "contact" ? <Contact lang={lang} /> : <Legal lang={lang} />;
}

function Contact({ lang }: { lang: Lang }) {
  const t = DICT[lang].contact;
  return (
    <>
      <Header lang={lang} page="contact" />
      <main id="contenu">
        <section className="hero">
          <div className="hero-copy">
            <p className="kicker">{DICT[lang].home.kicker}</p>
            <h1>{t.title}</h1>
            <p className="lead">{t.lead}</p>
            <ContactForm lang={lang} t={t} privacyHref={href(lang, "legal")} />
          </div>
          <Aside lang={lang} />
        </section>
      </main>
    </>
  );
}

function Legal({ lang }: { lang: Lang }) {
  const t = DICT[lang].legal;
  const labels = t.publisherLabels;
  const legal = COMPANY.legal;
  const phone = lang === "de" ? "+33 3 88 58 62 00" : COMPANY.phoneDisplay;

  const rows: [string, string][] = [
    [labels.form, legal.form],
    [labels.capital, legal.capital],
    [labels.siret, legal.siret],
    [labels.vat, legal.vat],
    [labels.publisher, legal.publisher],
  ];

  return (
    <>
      <Header lang={lang} page="legal" />
      <main id="contenu" className="doc">
        <div className="doc-inner">
          <h1>{t.title}</h1>

          <h2>{t.publisherH}</h2>
          <address>
            <strong>{COMPANY.name}</strong>
            <br />
            {COMPANY.street}
            <br />
            {COMPANY.zip} {COMPANY.city}, {DICT[lang].aside.country}
          </address>
          <dl>
            {rows
              .filter(([, value]) => value !== "")
              .map(([label, value]) => (
                <div key={label} style={{ display: "contents" }}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            <dt>{labels.phone}</dt>
            <dd>
              <a href={`tel:${COMPANY.phoneHref}`}>{phone}</a>
            </dd>
            <dt>{labels.email}</dt>
            <dd>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </dd>
          </dl>

          <h2>{t.hostH}</h2>
          <p>
            {COMPANY.host.name}
            <br />
            {COMPANY.host.address}
            <br />
            {COMPANY.host.phone} · {COMPANY.host.web}
          </p>

          <h2>{t.dataH}</h2>
          {t.dataBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <h2>{t.cookiesH}</h2>
          <p>{t.cookiesBody}</p>

          <h2>{t.ipH}</h2>
          <p>{t.ipBody}</p>

          <p className="updated">{t.updated}</p>
        </div>
      </main>
    </>
  );
}
