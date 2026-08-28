// Site-wide constants. Values marked TODO are placeholders — they were not
// part of the verified migration inventory and must be confirmed by Aaron
// before this site goes live.

export const SITE = {
  name: "Aaron Joseph Hall",
  tagline: "Pastor. Author. Speaker. Teacher. Consultant.",
  url: "https://aaronjosephhall.com",
  // TODO: confirm public contact email
  email: "hello@aaronjosephhall.com",
  locale: "en-US",
};

export interface NavLink {
  label: string;
  href: string;
}

// Trimmed to the site owner's requested page set (2026-08-28): Home, About,
// Writing, Books, Speaking, Contact, Work With Me, Newsletter. Everything
// else (Leadership, Consulting, Ministry, Media) was removed rather than
// hidden — see MIGRATION.md.
export const NAV_LINKS: (NavLink & { inNav?: boolean })[] = [
  { label: "About", href: "/about" },
  { label: "Writing", href: "/articles" },
  { label: "Speaking", href: "/speaking" },
  { label: "Books", href: "/books" },
  { label: "Work With Me", href: "/work-with-me" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Contact", href: "/contact" },
];

// TODO: confirm/replace with real profile URLs.
export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "Substack", href: "https://substack.com/@aaronjosephhall" },
];
