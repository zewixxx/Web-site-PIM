import { DICT } from "@/lib/i18n";
import { href, type Lang } from "@/lib/site";

export default function Footer({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  return (
    <footer className="foot">
      <span>{t.footer.line}</span>
      <a href={href(lang, "legal")}>{t.footer.legal}</a>
    </footer>
  );
}
