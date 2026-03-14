import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[100dvh]">{children}</main>
      <Footer />
    </>
  );
}
