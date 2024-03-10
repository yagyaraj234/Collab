"use client";
import React, { useState } from "react";
import { Metadata } from 'next';
import Link from "next/link";
 
// export const metadata: Metadata = {
//   title: 'Your Work || Collab',
 
 
// };
// const metadata = {
//     title: "Your Work",
//     description: "Your work",
    
// }

const Status = () => {
  const [selectedoption, setSelectedOption] = useState("Worked on");

  const options = ["Worked on", "Viewed", "Assigned", "Starred", "Resolved"];
  return (
    <div className="flex flex-col mt-8">
      <div className="flex gap-6  border-b-2 border-tertiary  relative pb-1 rounded-2 ">
        {options?.map((option, index) => (
          <div
            key={index}
            className={` cursor-pointer text-sm   group relative gap-1 mr-2  `}
            onClick={() => {
              setSelectedOption(option);
            }}
          >
            <div
              className={` font-medium flex gap-2 relative ${
                selectedoption === option
                  ? "text-primary"
                  : "text-textSecondary"
              }`}
            >
              {option}

              {option === 'Assigned' && (
                <div className="bg-tertiary px-3  rounded-full text-black   flex items-center justify-center text-xs">0</div>
              )}
            </div>
            <div
              className={`absolute group-hover:border-b-2    w-full pb-1  ${
                selectedoption === option
                  ? "border-b-2 border-primary"
                  : "border-textSecondary"
              } `}
            ></div>
          </div>
        ))}
      </div>

      {/* Content */}

      
    </div>
  );
};

const page = () => {
  return (
    <div className="flex flex-col gap-6 px-6 ">
      {/* Your Work */}
      <div className="font-semibold text-2xl mt-[16px] border-b-2  border-tertiary pb-[24px]">
        Your work
      </div>

      {/* Recent Projects */}

      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="font-medium text-lg text-black mb-4">
            Recent projects
          </div>
          <Link href="/projects" className="font-medium  cursor-pointer text-primary text-sm mb-4">
            View all projects
          </Link>
        </div>

        <div className="flex  gap-4 ">
          <div className="flex ">
            <div className="bg-white rounded-lg shadow-md p-4 max-w-[320px] h-[200px] hover:shadow-xl flex relative border">
              <div className="h-full w-8 bg-orange-500 box-content absolute top-0 left-0 rounded-l-lg z-0"></div>
              <div className="flex gap-2  ">
                <div className=" rounded-lg max-h-[32px] overflow-hidden max-w-[32px] z-10">
                  <img
                    src="https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHdvcmslMjBpY29ufGVufDB8fDB8fHww"
                    alt=""
                    className="rounded-lg"
                  />
                </div>
                <div className="cursor-pointer ">
                  <div className="hover:underline pl-1 w-full overflow-hidden">
                    <div className="font-semibold text-lg">Project 1</div>
                    <div className="text-sm text-textSecondary truncate overflow-hidden">
                      This is a description of the project
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 mt-5  text-textPrimary text-sm">
                    <div className="pl-1">QUICK LINKS</div>
                    <div className="hover:bg-tertiary pl-1 cursor-pointer ease-in-out duration-300 delay-75 transition-all rounded-sm">
                      My open issues
                    </div>
                    <div className="hover:bg-tertiary pl-1 cursor-pointer ease-in-out duration-300 delay-75 transition-all rounded-sm">
                      Done issues
                    </div>
                  </div>

                  <div className="w-full border-t border-tertiary mt-2"></div>

                  <div className="text-[14px] hover:bg-tertiary pl-1 py-2 duration-300 transition-all ease-in-out delay-75 font-medium">
                    Go to Workspace
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <Status />
    </div>
  );
};

// export { metadata };
export default page;
