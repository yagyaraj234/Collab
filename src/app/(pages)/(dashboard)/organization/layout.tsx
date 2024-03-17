import Navbar from "@/components/Layouts/Navbar";
const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default OrganizationLayout;
