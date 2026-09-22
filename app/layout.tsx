import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hitung Ceria · Latihan Matematika",
  description: "Latihan matematika kelas 3 SD. Belajar perkalian, pembagian, dan logika dengan pembahasan ramah anak.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
