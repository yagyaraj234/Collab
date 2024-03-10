import React from "react";
import Link from "next/link";

const Button = () => {
  return (
    <>

    <div className="w-full border-b-2 border-tertiary "></div>
    <Link href="/your-work" className="text-md font-normal tracking-tighter py-3 px-4  hover:bg-secondary my-2 duration-300 ease-in-out transition-all ">
      Go to Your Work page
    </Link>
    </>
  );
};

const WorkCard = () => {
  return (
    <div className="flex flex-col gap-2 text-textPrimary z-50">
      <div className="flex w-full text-nowrap px-4">
        <div className="py-2 px-4 text-textPrimary font-medium border-b-2  hover:border-primary duration-300 ease-in-out transition-all border-slate-300">
          Assigned to me
        </div>
        <div className="py-2 px-4 text-textPrimary font-medium border-b-2  hover:border-primary duration-300 ease-in-out transition-all border-slate-300">
          Recent
        </div>
        <div className="py-2 px-4 text-textPrimary font-medium border-b-2  hover:border-primary duration-300 ease-in-out transition-all border-slate-300">
          Boards
        </div>
      </div>

      <div className="text-nowrap w-full leading-tight px-5 my-5 font-normal text-textPrimary">You have no open issues assigned to you</div>

      {/* Got button */}

      <Button />
    </div>
  );
};

export default WorkCard;
