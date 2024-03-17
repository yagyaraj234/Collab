import { ClerkProvider } from "@clerk/nextjs";

const ClearkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <ClerkProvider>{children}</ClerkProvider>
    </div>
  );
};

export default ClearkLayout;
