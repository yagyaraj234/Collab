import Navbar from "@/components/Layouts/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <Navbar />
      {children}
    </ClerkProvider>
  );
};

export default OrganizationLayout;
