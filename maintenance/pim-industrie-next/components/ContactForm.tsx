"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";

type Props = {
  lang: string;
  t: Dict["contact"];
  privacyHref: string;
};

type Status = "idle" | "sending" | "ok" | "err";

const SUBJECTS = ["quote", "tech", "keys", "pos", "other"] as const;

export default function ContactForm({ lang, t, privacyHref }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const jeton = useRef("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  async function chargerJeton(): Promise<string> {
    try {
      const response = await fetch("/jeton.php", {
        headers: { Accept: "application/json" },
        credentials: "same-origin",
        cache: "no-store",
      });
      const body = await response.json();
      jeton.current = typeof body?.jeton === "string" ? body.jeton : "";
    } catch {
      jeton.current = "";
    }
    return jeton.current;
  }

  useEffect(() => {
    void chargerJeton();
  }, []);

  useEffect(() => {
    if (status === "ok" || status === "err") {
      statusRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);

    // Champ piège rempli : on fait semblant que tout s'est bien passé.
    if (String(data.get("societe_web") ?? "").trim() !== "") {
      setStatus("ok");
      form.reset();
      return;
    }

    setStatus("sending");
    try {
      if (!jeton.current) await chargerJeton();
      const payload = new URLSearchParams();
      for (const key of ["nom", "societe", "email", "telephone", "sujet", "message"]) {
        payload.set(key, String(data.get(key) ?? "").trim());
      }
      payload.set("langue", lang);
      payload.set("jeton", jeton.current);

      const response = await fetch("/envoyer.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "application/json",
        },
        credentials: "same-origin",
        body: payload.toString(),
      });
      const body = await response.json();
      if (response.ok && body?.ok) {
        form.reset();
        setStatus("ok");
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
    // Chaque envoi consomme le jeton : on en récupère un nouveau pour un éventuel second message.
    void chargerJeton();
  }

  return (
    <>
      {(status === "ok" || status === "err") && (
        <p
          ref={statusRef}
          className={`status ${status}`}
          role={status === "err" ? "alert" : "status"}
        >
          {status === "ok" ? t.success : t.error}
        </p>
      )}
      <form ref={formRef} className="contact-form" onSubmit={onSubmit} noValidate={false}>
        <div className="hp" aria-hidden="true">
          <label htmlFor="societe_web">Ne pas remplir</label>
          <input id="societe_web" name="societe_web" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div>
          <label htmlFor="nom">{t.name}</label>
          <input id="nom" name="nom" type="text" autoComplete="name" required maxLength={120} />
        </div>
        <div>
          <label htmlFor="societe">{t.company}</label>
          <input id="societe" name="societe" type="text" autoComplete="organization" maxLength={160} />
        </div>
        <div>
          <label htmlFor="email">{t.email}</label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={180} />
        </div>
        <div>
          <label htmlFor="telephone">{t.phone}</label>
          <input id="telephone" name="telephone" type="tel" autoComplete="tel" maxLength={40} />
        </div>
        <div className="full">
          <label htmlFor="sujet">{t.subject}</label>
          <select id="sujet" name="sujet" defaultValue="quote">
            {SUBJECTS.map((key) => (
              <option key={key} value={key}>
                {t.subjects[key]}
              </option>
            ))}
          </select>
        </div>
        <div className="full">
          <label htmlFor="message">{t.message}</label>
          <textarea id="message" name="message" required maxLength={4000} placeholder={t.placeholder} />
        </div>
        <p className="form-note full">
          {t.consent} <a href={privacyHref}>{t.privacyLink}</a>.
        </p>
        <div className="cta-row full">
          <button className="cta" type="submit" disabled={status === "sending"}>
            {status === "sending" ? t.sending : t.send}
          </button>
        </div>
        <noscript>
          <p className="status err full">{t.noscript}</p>
        </noscript>
      </form>
    </>
  );
}
