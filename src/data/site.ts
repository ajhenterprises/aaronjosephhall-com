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

// Preserves every verified top-level URL from the live site. `ministry` is
// included in the nav for now per "we can decide later" — flip `inNav` to
// false to drop it without touching the route or losing the page.
export const NAV_LINKS: (NavLink & { inNav?: boolean })[] = [
  { label: "About", href: "/about" },
  { label: "Writing", href: "/articles" },
  { label: "Speaking", href: "/speaking" },
  { label: "Books", href: "/books" },
  { label: "Leadership", href: "/leadership" },
  { label: "Consulting", href: "/consulting" },
  { label: "Ministry", href: "/ministry", inNav: true },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

// TODO: confirm/replace with real profile URLs.
export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "Substack", href: "https://substack.com/@aaronjosephhall" },
];
