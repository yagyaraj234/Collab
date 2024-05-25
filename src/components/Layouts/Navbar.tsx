"use client";

import React, { useState, useRef, useEffect } from "react";

import {
  Bell,
  ChevronDown,
  Grip,
  HelpCircle,
  Search,
  Settings,
  Handshake,
  X,
  Loader2,
} from "lucide-react";
import WorkCard from "./Cards/WorkCard";
import ProjectCard from "./Cards/ProjectCard";
import FilterCard from "./Cards/FilterCard";
import TeamCard from "./Cards/TeamCard";
import Link from "next/link";
import Help from "./Help/Help";
import SettingCard from "./Cards/SettingCard";
import { UserButton, OrganizationSwitcher, useAuth } from "@clerk/nextjs";
import { FormPopover } from "../form/form-popover";

const navOption = [
  {
    name: "Your work",
    component: <WorkCard />,
  },
  {
    name: "Projects",
    component: <ProjectCard />,
  },
  {
    name: "Filters",
    component: <FilterCard />,
  },
  {
    name: "Teams",
    component: <TeamCard />,
  },
];

const Navbar = () => {
  const [selectedNavOption, setSelectedNavOption] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  // const { sessionId, actor } = useAuth();
  // const { user } = useUser();

  // console.log(sessionId, actor, user);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setSelectedNavOption(""); // Close the box when clicked outside
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="flex w-full items-center py-4 px-6 border-b border-slate-400 select-none dark:bg-black dark:text-white">
      <div className="flex gap-2 text-nowrap mr-4">
        <Link
          href="/"
          className="font-medium text-textSecondary flex items-center cursor-pointer gap-2"
        >
          <Handshake color="blue" fontWeight={24} />
          Collab{" "}
        </Link>
      </div>

      <div className="flex justify-between w-full items-center text-sm relative">
        <div className="flex flex-row gap-2 text-textPrimary font-medium">
          {/* {navOption?.map((option, index) => (
            <div
              className={`flex gap-0.5 duration-300 transition-all ease-in-out py-1.5 px-2 rounded-md cursor-pointer font-semibold  items-center justify-center relative ${
                selectedNavOption === option.name
                  ? "bg-blue-600 bg-opacity-15 text-blue-500"
                  : "hover:bg-tertiary "
              }`}
              key={index}
              onClick={() => {
                if (selectedNavOption === option.name) {
                  setSelectedNavOption("");
                } else {
                  setSelectedNavOption(option.name);
                }
              }}
            >
              {option.name}
              <ChevronDown size={16} className="bg-red-40 -mr-1" />
              {selectedNavOption === option.name && (
                <div
                  className="absolute top-12 left-0 bg-white rounded-md shadow-xl z-10 text-black"
                  ref={ref}
                >
                  {option.component}
                </div>
              )}
            </div>
          ))} */}

          <FormPopover align="start" side="bottom" sideOffset={18}>
            <div
              className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer"
              // onClick={() => setCreateBoardModal(true)}
            >
              Create Board
            </div>
          </FormPopover>
        </div>

        <div className="flex gap-2 items-center">
          {/* <div className="flex items-center gap-1 border-2 rounded-md p-1">
            <Search size={20} />
            <input type="text" placeholder="Search" className="outline-none" />
          </div> */}
          {/* <div className="-rotate-5 cursor-pointer">
            <Bell />
          </div> */}

          <div
            onClick={() => setSelectedNavOption("help")}
            className="relative cursor-pointer"
          >
            <HelpCircle />
          </div>

          {/* <div
            className="cursor-pointer relative"
            onClick={() => setSelectedNavOption("Setting")}
          >
            <Settings />

            {selectedNavOption === "Setting" && (
              <div
                className="absolute top-12 right-[56px] bg-white rounded-md shadow-xl z-10 p-6 border"
                ref={ref}
              >
                <SettingCard />
              </div>
            )}
          </div> */}

          {selectedNavOption === "help" && (
            <div
              className="absolute  -right-6  top-[53px] min-w-[30vw] "
              ref={ref}
            >
              <Help setSelectedNavOption={setSelectedNavOption} />
            </div>
          )}

          <div className="flex gap-4">
            <OrganizationSwitcher
              hidePersonal
              afterCreateOrganizationUrl={"/organization/:id"}
              afterLeaveOrganizationUrl="/select-org"
              afterSelectOrganizationUrl={"/organization/:id"}
              appearance={{
                elements: {
                  rootBox: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                },
              }}
            />
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
