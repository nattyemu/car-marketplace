import React from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { MdSpeed } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import { BiSolidGasPump } from "react-icons/bi";
const DetailHeader = ({ carDetail }) => {
  if (!carDetail) {
    // Display a loading message or fallback if carDetail is null or undefined
    // return <div>Loading...</div>;
  }

  return (
    <div>
      {carDetail?.tagline ? (
        <div>
          <h2 className="font-bold text-3xl">{carDetail?.listingTitle}</h2>
          <p className=" text-sm">{carDetail?.tagline}</p>
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center bg-blue-50 text-primary rounded-full p-2 px-3">
              <FaCalendarDays className="h-7 w-7" />
              <h2 className="text-sm"> {carDetail?.year}</h2>
            </div>
            <div className="flex gap-2 items-center bg-blue-50 text-primary rounded-full p-2 px-3">
              <MdSpeed className="h-7 w-7" />
              <h2 className="text-sm"> {carDetail?.mileage}</h2>
            </div>
            <div className="flex gap-2 items-center bg-blue-50 text-primary rounded-full p-2 px-3">
              <GiGearStickPattern className="h-7 w-7" />
              <h2 className="text-sm"> {carDetail?.transmission}</h2>
            </div>
            <div className="flex gap-2 items-center bg-blue-50 text-primary rounded-full p-2 px-3">
              <BiSolidGasPump className="h-7 w-7" />
              <h2 className="text-sm"> {carDetail?.fuelType}</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-xl h-[100px] bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
};

export default DetailHeader;
