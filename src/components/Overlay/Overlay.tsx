import React from "react";

const Overlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed h-screen w-screen bg-black top-0 left-0 bg-opacity-25 flex items-center justify-center z-[500]">
      {children}
    </div>
  );
};

export default Overlay;
