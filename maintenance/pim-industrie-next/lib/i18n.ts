import type { Lang } from "./site";

export type Dict = {
  htmlLang: string;
  locale: string;
  langName: string;
  chooseLang: string;
  skip: string;
  logoAria: string;
  home: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    lead: string;
    write: string;
    call: string;
    offerTitle: string;
    offers: { title: string; text: string }[];
  };
  aside: {
    aria: string;
    callUs: string;
    fax: string;
    writeUs: string;
    visit: string;
    country: string;
    hours: string;
    hoursLines: string[];
  };
  nav: { home: string; contact: string; legal: string; linkedin: string };
  footer: { line: string; legal: string };
  contact: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    lead: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    subject: string;
    subjects: { quote: string; tech: string; keys: string; pos: string; other: string };
    message: string;
    placeholder: string;
    consent: string;
    privacyLink: string;
    required: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    noscript: string;
  };
  legal: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    publisherH: string;
    publisherLabels: { form: string; capital: string; siret: string; vat: string; publisher: string; phone: string; email: string };
    hostH: string;
    dataH: string;
    dataBody: string[];
    cookiesH: string;
    cookiesBody: string;
    ipH: string;
    ipBody: string;
    updated: string;
  };
};

const fr: Dict = {
  htmlLang: "fr",
  locale: "fr_FR",
  langName: "Français",
  chooseLang: "Choisir la langue",
  skip: "Aller au contenu",
  logoAria: "PIM Industrie, accueil",
  home: {
    metaTitle: "PIM Industrie — Claviers, faces avant, étiquettes et PLV à Marckolsheim",
    metaDescription:
      "PIM Industrie, fabricant alsacien depuis 1961 à Marckolsheim : claviers, faces avant, étiquettes techniques et PLV. Écrivez-nous pour votre projet.",
    kicker: "Marckolsheim · depuis 1961",
    title: "Notre nouveau site arrive très bientôt.",
    lead: "Nous finalisons une version plus claire de pim-industrie.com. En attendant sa mise en ligne, écrivez-nous pour vos projets de claviers, faces avant, étiquettes et PLV.",
    write: "Nous écrire",
    call: "Appeler le 03 88 58 62 00",
    offerTitle: "Notre savoir-faire",
    offers: [
      { title: "Claviers", text: "Claviers et interfaces utilisateur sur mesure pour vos équipements." },
      { title: "Faces avant", text: "Faces avant techniques, imprimées et façonnées selon vos plans." },
      { title: "Étiquettes", text: "Étiquettes techniques et d’identification pour l’industrie." },
      { title: "PLV", text: "Supports de communication et PLV pour vos points de vente." },
    ],
  },
  aside: {
    aria: "Coordonnées",
    callUs: "Nous appeler",
    fax: "Fax : 03 88 58 62 10",
    writeUs: "Nous écrire",
    visit: "Nous rendre visite",
    country: "France",
    hours: "Horaires",
    hoursLines: ["Du lundi au vendredi", "De 8h à 12h et de 13h à 16h", "Sur rendez-vous"],
  },
  nav: { home: "Accueil", contact: "Contact", legal: "Mentions légales", linkedin: "PIM Industrie sur LinkedIn" },
  footer: { line: "© PIM Industrie · Fabricant alsacien · ISO 9001", legal: "Mentions légales et confidentialité" },
  contact: {
    metaTitle: "Contact — PIM Industrie",
    metaDescription:
      "Contactez PIM Industrie à Marckolsheim pour un devis ou une question technique : claviers, faces avant, étiquettes et PLV.",
    title: "Écrire à PIM Industrie",
    lead: "Décrivez votre projet de clavier, face avant, étiquette ou PLV. Votre message est transmis directement à notre équipe.",
    name: "Nom *",
    company: "Société",
    email: "E-mail *",
    phone: "Téléphone",
    subject: "Sujet",
    subjects: {
      quote: "Demande de devis",
      tech: "Question technique",
      keys: "Claviers et faces avant",
      pos: "Étiquettes et PLV",
      other: "Autre",
    },
    message: "Votre message *",
    placeholder: "Décrivez votre besoin, la pièce ou la série.",
    consent:
      "* Champs obligatoires. Les informations saisies servent uniquement à répondre à votre demande.",
    privacyLink: "En savoir plus sur le traitement de vos données",
    required: "Merci de remplir les champs obligatoires.",
    send: "Envoyer le message",
    sending: "Envoi en cours…",
    success: "Merci, votre message a bien été envoyé. Nous vous répondrons rapidement.",
    error:
      "Le message n’a pas pu être envoyé. Appelez le 03 88 58 62 00 ou écrivez à info@pim-industrie.com.",
    noscript:
      "JavaScript est nécessaire pour envoyer le formulaire. Vous pouvez aussi nous écrire à info@pim-industrie.com ou nous appeler au 03 88 58 62 00.",
  },
  legal: {
    metaTitle: "Mentions légales et confidentialité — PIM Industrie",
    metaDescription: "Mentions légales, hébergeur et protection des données personnelles du site PIM Industrie.",
    title: "Mentions légales et confidentialité",
    publisherH: "Éditeur du site",
    publisherLabels: {
      form: "Forme juridique",
      capital: "Capital",
      siret: "SIRET",
      vat: "N° de TVA intracommunautaire",
      publisher: "Directeur de la publication",
      phone: "Téléphone",
      email: "E-mail",
    },
    hostH: "Hébergeur",
    dataH: "Données personnelles",
    dataBody: [
      "Le formulaire de contact collecte votre nom, votre e-mail, votre message et, si vous le souhaitez, votre société et votre téléphone. Ces données sont utilisées uniquement pour répondre à votre demande, sur la base de notre intérêt légitime à répondre aux sollicitations commerciales et techniques.",
      "Elles sont transmises par e-mail à l’équipe de PIM Industrie, ne sont ni vendues ni cédées, et sont conservées le temps nécessaire au traitement de votre demande puis, au plus, trois ans après le dernier échange.",
      "Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition et de limitation. Pour l’exercer, écrivez à info@pim-industrie.com. Vous pouvez aussi introduire une réclamation auprès de la CNIL (www.cnil.fr).",
    ],
    cookiesH: "Cookies",
    cookiesBody:
      "Ce site n’utilise ni cookie publicitaire, ni outil de mesure d’audience. Seul un cookie technique de session, supprimé à la fermeture du navigateur, est utilisé pour protéger le formulaire de contact contre les envois automatisés. Il ne nécessite pas de consentement.",
    ipH: "Sécurité et adresse IP",
    ipBody:
      "Pour limiter le spam, un compteur d’envois par adresse IP est conservé pendant une heure sous forme chiffrée (non réversible). Aucune adresse IP n’est stockée en clair.",
    updated: "Dernière mise à jour : novembre 2026.",
  },
};

const en: Dict = {
  htmlLang: "en",
  locale: "en_GB",
  langName: "English",
  chooseLang: "Choose language",
  skip: "Skip to content",
  logoAria: "PIM Industrie, home",
  home: {
    metaTitle: "PIM Industrie — Keyboards, front panels, labels and POS in Marckolsheim",
    metaDescription:
      "PIM Industrie, Alsatian manufacturer since 1961 in Marckolsheim, France: keyboards, front panels, technical labels and POS displays. Write to us about your project.",
    kicker: "Marckolsheim · since 1961",
    title: "Our new website is coming very soon.",
    lead: "We are finishing a clearer version of pim-industrie.com. Until it goes live, write to us about your keyboards, front panels, labels and POS displays.",
    write: "Write to us",
    call: "Call 03 88 58 62 00",
    offerTitle: "Our expertise",
    offers: [
      { title: "Keyboards", text: "Custom keyboards and user interfaces for your equipment." },
      { title: "Front panels", text: "Technical front panels, printed and finished to your drawings." },
      { title: "Labels", text: "Technical and identification labels for industry." },
      { title: "POS displays", text: "Communication supports and POS displays for your points of sale." },
    ],
  },
  aside: {
    aria: "Contact details",
    callUs: "Call us",
    fax: "Fax: 03 88 58 62 10",
    writeUs: "Email us",
    visit: "Visit us",
    country: "France",
    hours: "Hours",
    hoursLines: ["Monday to Friday", "8 a.m. to 12 p.m. and 1 p.m. to 4 p.m.", "By appointment"],
  },
  nav: { home: "Home", contact: "Contact", legal: "Legal notice", linkedin: "PIM Industrie on LinkedIn" },
  footer: { line: "© PIM Industrie · Alsatian manufacturer · ISO 9001", legal: "Legal notice and privacy" },
  contact: {
    metaTitle: "Contact — PIM Industrie",
    metaDescription:
      "Contact PIM Industrie in Marckolsheim, France, for a quote or a technical question: keyboards, front panels, labels and POS displays.",
    title: "Write to PIM Industrie",
    lead: "Describe your keyboard, front panel, label or POS project. Your message goes straight to our team.",
    name: "Name *",
    company: "Company",
    email: "E-mail *",
    phone: "Phone",
    subject: "Subject",
    subjects: {
      quote: "Quote request",
      tech: "Technical question",
      keys: "Keyboards and front panels",
      pos: "Labels and POS",
      other: "Other",
    },
    message: "Your message *",
    placeholder: "Describe your need, the part or the series.",
    consent: "* Required fields. The information you enter is used only to reply to your request.",
    privacyLink: "Learn more about how your data is handled",
    required: "Please fill in the required fields.",
    send: "Send the message",
    sending: "Sending…",
    success: "Thank you, your message has been sent. We will reply shortly.",
    error:
      "The message could not be sent. Call 03 88 58 62 00 or write to info@pim-industrie.com.",
    noscript:
      "JavaScript is required to send the form. You can also write to info@pim-industrie.com or call 03 88 58 62 00.",
  },
  legal: {
    metaTitle: "Legal notice and privacy — PIM Industrie",
    metaDescription: "Legal notice, hosting provider and personal data protection for the PIM Industrie website.",
    title: "Legal notice and privacy",
    publisherH: "Website publisher",
    publisherLabels: {
      form: "Legal form",
      capital: "Share capital",
      siret: "SIRET",
      vat: "EU VAT number",
      publisher: "Publication director",
      phone: "Phone",
      email: "E-mail",
    },
    hostH: "Hosting provider",
    dataH: "Personal data",
    dataBody: [
      "The contact form collects your name, e-mail address, message and, if you wish, your company and phone number. This data is used only to reply to your request, on the basis of our legitimate interest in answering commercial and technical enquiries.",
      "It is sent by e-mail to the PIM Industrie team, is never sold or passed on, and is kept for as long as needed to handle your request and, at most, three years after the last exchange.",
      "Under the GDPR you have the right of access, rectification, erasure, objection and restriction. To exercise them, write to info@pim-industrie.com. You may also lodge a complaint with the CNIL (www.cnil.fr).",
    ],
    cookiesH: "Cookies",
    cookiesBody:
      "This website uses no advertising cookies and no analytics. Only a technical session cookie, deleted when you close your browser, protects the contact form against automated submissions. It does not require consent.",
    ipH: "Security and IP address",
    ipBody:
      "To limit spam, a counter of submissions per IP address is kept for one hour in hashed (irreversible) form. No IP address is stored in clear text.",
    updated: "Last updated: November 2026.",
  },
};

const de: Dict = {
  htmlLang: "de",
  locale: "de_DE",
  langName: "Deutsch",
  chooseLang: "Sprache wählen",
  skip: "Zum Inhalt springen",
  logoAria: "PIM Industrie, Startseite",
  home: {
    metaTitle: "PIM Industrie — Tastaturen, Frontplatten, Etiketten und POS in Marckolsheim",
    metaDescription:
      "PIM Industrie, elsässischer Hersteller seit 1961 in Marckolsheim, Frankreich: Tastaturen, Frontplatten, technische Etiketten und POS-Displays. Schreiben Sie uns zu Ihrem Projekt.",
    kicker: "Marckolsheim · seit 1961",
    title: "Unsere neue Website ist sehr bald online.",
    lead: "Wir stellen eine klarere Version von pim-industrie.de fertig. Bis zum Start schreiben Sie uns zu Ihren Projekten für Tastaturen, Frontplatten, Etiketten und POS.",
    write: "Schreiben Sie uns",
    call: "Anrufen: +33 3 88 58 62 00",
    offerTitle: "Unser Know-how",
    offers: [
      { title: "Tastaturen", text: "Kundenspezifische Tastaturen und Bedienoberflächen für Ihre Geräte." },
      { title: "Frontplatten", text: "Technische Frontplatten, bedruckt und gefertigt nach Ihren Zeichnungen." },
      { title: "Etiketten", text: "Technische Etiketten und Kennzeichnungen für die Industrie." },
      { title: "POS", text: "Kommunikationsträger und POS-Displays für Ihre Verkaufsstellen." },
    ],
  },
  aside: {
    aria: "Kontaktdaten",
    callUs: "Rufen Sie uns an",
    fax: "Fax: +33 3 88 58 62 10",
    writeUs: "Schreiben Sie uns",
    visit: "Besuchen Sie uns",
    country: "Frankreich",
    hours: "Öffnungszeiten",
    hoursLines: ["Montag bis Freitag", "8 bis 12 Uhr und 13 bis 16 Uhr", "Nach Vereinbarung"],
  },
  nav: { home: "Start", contact: "Kontakt", legal: "Impressum", linkedin: "PIM Industrie auf LinkedIn" },
  footer: { line: "© PIM Industrie · Elsässischer Hersteller · ISO 9001", legal: "Impressum und Datenschutz" },
  contact: {
    metaTitle: "Kontakt — PIM Industrie",
    metaDescription:
      "Kontaktieren Sie PIM Industrie in Marckolsheim (Frankreich) für ein Angebot oder eine technische Frage: Tastaturen, Frontplatten, Etiketten und POS.",
    title: "PIM Industrie schreiben",
    lead: "Beschreiben Sie Ihr Projekt für Tastatur, Frontplatte, Etikett oder POS. Ihre Nachricht geht direkt an unser Team.",
    name: "Name *",
    company: "Firma",
    email: "E-Mail *",
    phone: "Telefon",
    subject: "Betreff",
    subjects: {
      quote: "Angebotsanfrage",
      tech: "Technische Frage",
      keys: "Tastaturen und Frontplatten",
      pos: "Etiketten und POS",
      other: "Sonstiges",
    },
    message: "Ihre Nachricht *",
    placeholder: "Beschreiben Sie Ihren Bedarf, das Teil oder die Serie.",
    consent: "* Pflichtfelder. Ihre Angaben dienen ausschließlich der Beantwortung Ihrer Anfrage.",
    privacyLink: "Mehr zum Umgang mit Ihren Daten",
    required: "Bitte füllen Sie die Pflichtfelder aus.",
    send: "Nachricht senden",
    sending: "Wird gesendet…",
    success: "Vielen Dank, Ihre Nachricht wurde gesendet. Wir antworten Ihnen bald.",
    error:
      "Die Nachricht konnte nicht gesendet werden. Rufen Sie +33 3 88 58 62 00 an oder schreiben Sie an info@pim-industrie.com.",
    noscript:
      "Zum Senden des Formulars wird JavaScript benötigt. Sie können uns auch an info@pim-industrie.com schreiben oder unter +33 3 88 58 62 00 anrufen.",
  },
  legal: {
    metaTitle: "Impressum und Datenschutz — PIM Industrie",
    metaDescription: "Impressum, Hosting-Anbieter und Datenschutzhinweise der Website von PIM Industrie.",
    title: "Impressum und Datenschutz",
    publisherH: "Anbieter der Website",
    publisherLabels: {
      form: "Rechtsform",
      capital: "Kapital",
      siret: "SIRET",
      vat: "USt-IdNr.",
      publisher: "Verantwortlich für den Inhalt",
      phone: "Telefon",
      email: "E-Mail",
    },
    hostH: "Hosting-Anbieter",
    dataH: "Personenbezogene Daten",
    dataBody: [
      "Das Kontaktformular erfasst Ihren Namen, Ihre E-Mail-Adresse, Ihre Nachricht sowie, falls gewünscht, Ihre Firma und Telefonnummer. Diese Daten werden ausschließlich zur Beantwortung Ihrer Anfrage verwendet (berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO).",
      "Sie werden per E-Mail an das Team von PIM Industrie übermittelt, weder verkauft noch weitergegeben und so lange gespeichert, wie es zur Bearbeitung Ihrer Anfrage nötig ist, höchstens jedoch drei Jahre nach dem letzten Austausch.",
      "Nach der DSGVO haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Widerspruch und Einschränkung der Verarbeitung. Schreiben Sie dazu an info@pim-industrie.com. Sie können sich außerdem bei der französischen Aufsichtsbehörde CNIL (www.cnil.fr) beschweren.",
    ],
    cookiesH: "Cookies",
    cookiesBody:
      "Diese Website verwendet weder Werbe-Cookies noch Analysewerkzeuge. Lediglich ein technisches Sitzungs-Cookie, das beim Schließen des Browsers gelöscht wird, schützt das Kontaktformular vor automatisierten Absendungen. Es erfordert keine Einwilligung.",
    ipH: "Sicherheit und IP-Adresse",
    ipBody:
      "Zur Spam-Abwehr wird ein Zähler der Absendungen pro IP-Adresse eine Stunde lang in verschlüsselter (nicht umkehrbarer) Form gespeichert. IP-Adressen werden nicht im Klartext gespeichert.",
    updated: "Letzte Aktualisierung: November 2026.",
  },
};

export const DICT: Record<Lang, Dict> = { fr, en, de };
