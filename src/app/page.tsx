import { AppProvider } from "@/context/AppContext";
import { PhoneShell } from "@/components/PhoneShell";

export default function HomePage() {
  return (
    <AppProvider>
      <PhoneShell />
    </AppProvider>
  );
}
