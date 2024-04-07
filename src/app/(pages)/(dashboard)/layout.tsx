import Navbar from "@/components/Layouts/Navbar";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <Navbar />
      {children}
      <Toaster />
    </ClerkProvider>
  );
};

export default OrganizationLayout;
