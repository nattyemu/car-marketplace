import React from "react";
import Search from "./Search";
const Hero = () => {
  return (
    <div>
      <div className="flex flex-col items-center py-20 p-10 gap-6 h-[650px] bg-[#eef0fc] w-full">
        <h2 className="text-lg">Find cars for sale and for rent near you</h2>
        <h2 className="text-[60px] font-bold">Find Your Dream Car</h2>
        {/* Search */}
        <Search />
        <img src="/tesla.png" className="mt-10" />
      </div>
    </div>
  );
};

export default Hero;
