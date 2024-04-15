"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useNavOption } from "@/hooks/use-nav-option";

const Sidebar = () => {
  const params = useParams();
  const router = useRouter();
  const { nav } = useNavOption((state) => state);

  const sidebarItem = [
    {
      name: "Overview",
      // href: "/dashboard/organization/[organizationId]",
      href: `/organization/${params.organizationId}`,
    },
    {
      name: "Members",
      href: `/organization/${params.organizationId}/members`,
    },
    // {
    //   name: "Boards",
    //   href: "/boards",
    // },
    {
      name: "Activity",
      href: `/organization/${params.organizationId}/activity`,
    },
  ];

  return (
    <div
      className="flex flex-col  text-black gap-y-2
   h-full pr-2 border-r-2 border-slate-200"
    >
      {sidebarItem.map((item) => (
        <div
          className={`flex items-center gap-x-2 hover:bg-slate-200 rounded-md ease-in-out transition-all duration-100 py-2 px-3 caret-purple-50 cursor-pointer ${
            item.name === nav && "bg-slate-200"
          } `}
          onClick={() => {
            useNavOption.getState().setNavValue(item.name); 
            router.push(item.href);
          }}
          key={item.name}
        >
          {/* <div className="w-2 h-2 bg-gray-300 rounded-full"></div> */}
          <div className="text-xl font-medium text-gray-800 min-w-[120px]">
            {item?.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
