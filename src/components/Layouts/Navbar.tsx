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
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import Overlay from "../Overlay/Overlay";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "../../../action/create-board";
import { toast } from "sonner";

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
  const [createBoardModal, setCreateBoardModal] = useState(false);

  const { run, fieldErrors, isLoading } = useAction(createBoard, {
    onSuccess: () => {
      setCreateBoardModal(false);
      toast.success("Board created successfully");
    },
    onError: () => {
      console.log("error");
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    run({ title });
  };

  //  });
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
      <div className={`${!createBoardModal && "hidden"}`}>
        <Overlay>
          <div className="bg-white  relative min-h-[40vh] w-[30vw] rounded-md p-4 w">
            <div
              className="absolute cursor-pointer rounded-full bg-white bg-opacity-40 -right-12 h-10 w-10 -top-0 flex items-center justify-center"
              onClick={() => setCreateBoardModal(false)}
            >
              <X />
            </div>

            <form action={onSubmit} className="w-full space-y-2">
              <label htmlFor="title" className="font-medium">
                Title <span className="text-red-500 align-super">**</span>{" "}
              </label>
              <input
                type="text"
                name="title"
                placeholder="Issue Board..."
                className="outline-none border border-black rounded-sm p-2 w-full text-sm mb-4"
                autoFocus={true}
              />
              <label htmlFor="description" className="font-medium mt-4">
                Description
              </label>

              <textarea
                name="description"
                id="description"
                placeholder="This board is for tracking issues..."
                rows={4}
                className="outline-none border border-black rounded-sm p-2 w-full resize-none text-sm"
              ></textarea>
              {isLoading ? (
                <Button
                  disabled
                  className="bg-primary text-white w-full flex items-center justify-center"
                >
                  <Loader2 /> Creating...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-primary text-white w-full flex items-center justify-center"
                >
                  Create Board
                </Button>
              )}
            </form>
          </div>
        </Overlay>
      </div>

      <div className="flex gap-2 text-nowrap mr-4">
        {/* <div>
          <Grip size={20} />
        </div> */}
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
                <div
                  className="absolute top-12 left-0 bg-white rounded-md shadow-xl z-10 text-black"
                  ref={ref}
                >
                  {option.component}
                </div>
              )}
            </div>
          ))}

          <div
            className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => setCreateBoardModal(true)}
          >
            Create Board
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1 border-2 rounded-md p-1">
            <Search size={20} />
            <input type="text" placeholder="Search" className="outline-none" />
          </div>
          <div className="-rotate-5 cursor-pointer">
            <Bell />
          </div>

          <div
            onClick={() => setSelectedNavOption("help")}
            className="relative cursor-pointer"
          >
            <HelpCircle />
          </div>

          <div
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
          </div>

          {selectedNavOption === "help" && (
            <div
              className="absolute  -right-6  top-[53px] min-w-[30vw] "
              ref={ref}
            >
              <Help setSelectedNavOption={setSelectedNavOption} />
            </div>
          )}

          {/* <div className="h-[28px] w-[28px] font-bold bg-textSecondary flex items-center justify-center text-white rounded-full cursor-pointer">
            
          </div> */}
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
