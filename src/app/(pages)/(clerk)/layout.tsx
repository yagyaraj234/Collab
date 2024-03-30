// import ClerkNav from "./_components/ClerkNav";
import { ClerkProvider } from "@clerk/nextjs";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex  items-center justify-center h-screen">
        <ClerkProvider>{children}</ClerkProvider>
      </div>
    </div>
  );
};

export default ClerkLayout;
