import React from "react";
import { Sun, MoonStar } from "lucide-react";
import { useState } from "react";
const SettingCard = () => {
  const [theme, setTheme] = useState("light");
  return (
    <div className="flex flex-col gap-2 w-full">

        <div className="text-sm font-medium w-full ">Change theme</div>
        <div className="my-1 h-[1px] w-full bg-tertiary"></div>
      <div className="flex  border-2  relative rounded-full">
        <div
          className={`bg-yellow-500 min-w-[50%] h-full absolute -z-10 box-content rounded-full transition-all duration-700 ease-in-out ${
            theme === 'light' && 'translate-x-full'
          }`}
        ></div>

        <div className="flex gap-1 text-sm p-2 items-center justify-center cursor-pointer" onClick={()=>setTheme('dark')}>
          <MoonStar />
          Dark
        </div>
        <div className="flex gap-1 text-sm p-2 items-center justify-center cursor-pointer" onClick={()=>setTheme('light')}>
          <Sun />
          Light
        </div>
      </div>
    </div>
  );
};

export default SettingCard;
