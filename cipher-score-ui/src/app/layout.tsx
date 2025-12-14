import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CipherScore",
  description: "Privacy-preserving credit scoring demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="animated-yellow-bg text-slate-900">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
