import InvitacionClient from "@/components/InvitacionClient";
import { LanguageProvider } from "@/lib/i18n";

export default function Home() {
  return (
    <LanguageProvider>
      <InvitacionClient />
    </LanguageProvider>
  );
}
