import { OrganizationList } from "@clerk/nextjs";

const SelectOrgPage = () => {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl={"/organization/:id"}
      afterSelectOrganizationUrl={"/organization/:id"}
    />
  );
};

export default SelectOrgPage;
