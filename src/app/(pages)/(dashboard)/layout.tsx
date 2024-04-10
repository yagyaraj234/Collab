import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "@/components/Layouts/Navbar";
import { ModalProvider } from "@/components/modals/card-modal/providers/modal-provider";
import { QueryProvider } from "@/components/modals/card-modal/providers/query-provider";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Navbar />
        <ModalProvider />
        {children}
        <Toaster />
      </QueryProvider>
    </ClerkProvider>
  );
};

export default OrganizationLayout;
