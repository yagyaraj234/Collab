import { OrganizationList } from "@clerk/nextjs";

const SelectOrgPage = () => {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl={"/dashboard/:id"}
      afterSelectOrganizationUrl={"/dashboard/:id"}
    />
  );
};

export default SelectOrgPage;
