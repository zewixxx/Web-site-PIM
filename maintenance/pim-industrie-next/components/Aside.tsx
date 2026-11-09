import { DICT } from "@/lib/i18n";
import { COMPANY, type Lang } from "@/lib/site";

export default function Aside({ lang }: { lang: Lang }) {
  const t = DICT[lang].aside;
  const phone = lang === "de" ? "+33 3 88 58 62 00" : COMPANY.phoneDisplay;
  return (
    <aside className="hero-aside" aria-label={t.aria}>
      <div>
        <h2>{t.callUs}</h2>
        <p>
          <a href={`tel:${COMPANY.phoneHref}`}>{phone}</a>
          <br />
          <span>{t.fax}</span>
        </p>
      </div>
      <div>
        <h2>{t.writeUs}</h2>
        <p>
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </p>
      </div>
      <div>
        <h2>{t.visit}</h2>
        <p>
          {COMPANY.street}
          <br />
          {COMPANY.zip} {COMPANY.city}
          <br />
          {t.country}
        </p>
      </div>
      <div>
        <h2>{t.hours}</h2>
        <p>
          {t.hoursLines.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </div>
    </aside>
  );
}
