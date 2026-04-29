import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Gurdwara Nanaksar Fresno",
  description:
    "Articles about Sikhism, community, and events from Gurdwara Nanaksar Fresno — serving the Central Valley of California.",
  openGraph: {
    title: "Blog | Gurdwara Nanaksar Fresno",
    description:
      "Articles about Sikhism, community, and events from Gurdwara Nanaksar Fresno.",
    url: "https://gurdwaranankasarfresno.org/blog",
    siteName: "Gurdwara Nanaksar Fresno",
    locale: "en_US",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
