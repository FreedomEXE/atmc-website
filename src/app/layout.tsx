import "./globals.css";
import "../styles/motion.css";
import ScrollProvider from "@/components/providers/ScrollProvider";

export const metadata = {
  title: "ATMC - Your Property, Our Priority",
  description: "Animation-first property experience for ATMC — Your Property, Our Priority.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  );
}
