import React from "react";
import { Plus, UsersRound } from "lucide-react";
const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2 border-0 border-slate-200 text-textPrimary">
      {children}
    </div>
  );
};

const Button = ({ name, icon }: { name: string; icon?: any }) => {
  return (
    <div className="flex gap-2 w-full items-center  min-w-[240px] px-4 py-2 hover:bg-secondary  duration-300 ease-in-out transition-all">
      <div> {icon}</div>
      <div className="text-md font-normal tracking-tighter    ">{name}</div>
    </div>
  );
};

const TeamCard = () => {
  return (
    <CardWrapper>
      <Button name="Invite People to Collab" icon={<Plus />} />
      <Button name="Create a Team" icon={<UsersRound />} />

      <div className="w-full border-b-2 border-tertiary"></div>

      <Button name={`Search people and teams`} />

      <div className="mb bg-white"></div>
    </CardWrapper>
  );
};

export default TeamCard;
