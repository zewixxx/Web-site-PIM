import { DICT } from "@/lib/i18n";
import { COMPANY, LANGS, LINKEDIN, href, type Lang, type PageKey } from "@/lib/site";

export default function Header({ lang, page }: { lang: Lang; page: PageKey }) {
  const t = DICT[lang];

  return (
    <>
      <a className="skip" href="#contenu">
        {t.skip}
      </a>
      <div className="util">
        <a className="util-phone" href={`tel:${COMPANY.phoneHref}`}>
          {lang === "de" ? "+33 3 88 58 62 00" : COMPANY.phoneDisplay}
        </a>
        <nav className="lang" aria-label={t.chooseLang}>
          {LANGS.map((code) => (
            <a
              key={code}
              href={href(code, page)}
              hrefLang={code}
              lang={code}
              aria-current={code === lang ? "true" : undefined}
            >
              {DICT[code].langName}
            </a>
          ))}
        </nav>
      </div>
      <header className="nav">
        <a href={href(lang, "home")} aria-label={t.logoAria}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/medias/logo_pim_industrie_aplat.png" alt="PIM Industrie" width={400} height={85} />
        </a>
        <nav className="nav-links" aria-label="Navigation">
          <a href={href(lang, "home")} aria-current={page === "home" ? "page" : undefined}>
            {t.nav.home}
          </a>
          <a href={href(lang, "contact")} aria-current={page === "contact" ? "page" : undefined}>
            {t.nav.contact}
          </a>
          <a
            className="nav-linkedin"
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.nav.linkedin}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"
              />
            </svg>
          </a>
        </nav>
      </header>
    </>
  );
}
