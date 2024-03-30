import Header from "./_components/Header/Header";
import { ClerkProvider } from "@clerk/nextjs";
const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      {/* Header */}
      <Header />
      {children}

      {/* Footer */}
    </ClerkProvider>
  );
};

export default MarketingLayout;
