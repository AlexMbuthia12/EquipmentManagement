import React from "react";

const PageLoader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-[#006b3c] animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-[#006b3c] animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-[#006b3c] animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
};

export default PageLoader;
