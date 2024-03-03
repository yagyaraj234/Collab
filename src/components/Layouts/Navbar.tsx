'use client'

import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Grip, HelpCircle, Search, Settings, Handshake } from "lucide-react";
import WorkCard from "./Cards/WorkCard";
import ProjectCard from "./Cards/ProjectCard";
import FilterCard from "./Cards/FilterCard";
import TeamCard from "./Cards/TeamCard";
import Link from "next/link";

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
  const ref = useRef<HTMLDivElement>(null); // Add type annotation for ref

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
        <div>
          <Grip size={20} />
        </div>
        <Link href="/" className="font-medium text-textSecondary flex items-center cursor-pointer gap-2">
          <Handshake color="blue" fontWeight={24} />
          Collab{" "}
        </Link>
      </div>

      <div className="flex justify-between w-full items-center text-sm">
        <div className="flex flex-row gap-2 text-textPrimary font-medium">
          {navOption?.map((option, index) => (
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
                <div className="absolute top-12 left-0 bg-white rounded-md shadow-xl z-10" ref={ref}>
                  {option.component}
                </div>
              )}
            </div>
          ))}

          <div className="bg-primary text-white px-4 py-2 rounded-md">Create</div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1 border-2 rounded-md p-1">
            <Search size={20} />
            <input type="text" placeholder="Search" className="outline-none" />
          </div>
          <div className="-rotate-5">
            <Bell />
          </div>

          <div>
            <HelpCircle />
          </div>

          <div>
            <Settings />
          </div>

          <div className="h-[28px] w-[28px] font-bold bg-textSecondary flex items-center justify-center text-white rounded-full">
            Y
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
