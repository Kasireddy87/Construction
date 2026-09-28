import { CurtainIntro } from "@/components/site/curtain-intro";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { getCompanyInfo } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const company = await getCompanyInfo();

  return (
    <div className="flex min-h-dvh flex-col">
      <CurtainIntro />
      <Header company={company} />
      <main className="flex-1">{children}</main>
      <Footer company={company} />
      <WhatsAppButton phoneDigits={company.whatsappNumber} />
    </div>
  );
}
