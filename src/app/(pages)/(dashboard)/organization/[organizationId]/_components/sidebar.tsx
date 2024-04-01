"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import Link from "next/link";
import { useParams } from "next/navigation";

const sidebarItem = [
  {
    name: "Overview",
    // href: "/dashboard/organization/[organizationId]",
    href: "",
  },
  {
    name: "Members",
    href: "/members",
  },
  {
    name: "Boards",
    href: "/boards",
  },
  {
    name: "Activity",
    href: "/activity",
  },
];

const Sidebar = () => {
  const params = useParams();

  return (
    <div
      className="flex flex-col  text-black gap-y-2
   h-full pr-2"
    >
      {sidebarItem.map((item) => (
        <Link
          className="flex items-center gap-x-2 hover:bg-slate-200 rounded-md ease-in-out transition-all duration-100 py-2 px-3 caret-purple-50 cursor-pointer  "
          href={`${params.organizationId}${item.href}`}
          key={item.name}
        >
          {/* <div className="w-2 h-2 bg-gray-300 rounded-full"></div> */}
          <div className="text-xl font-medium text-gray-800 min-w-[120px]">
            {item?.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
