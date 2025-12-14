import "./globals.css";
import "../styles/motion.css";
import ScrollProvider from "@/components/providers/ScrollProvider";

export const metadata = {
  title: "ATMC - Premium Property Management",
  description: "Animation-first property management website",
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
