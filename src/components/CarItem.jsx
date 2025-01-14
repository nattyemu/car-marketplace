import { Separator } from "@/components/ui/separator";
import React from "react";
import { LuFuel } from "react-icons/lu";
import { MdSpeed } from "react-icons/md";
import { MdOutlineOpenInNew } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import { Link } from "react-router-dom";
const CarItem = ({ car }) => {
  return (
    <Link to={"/add-listing/" + car?.id}>
      <div className="rounded-xl hover:shadow-md cursor-pointer bg-white">
        <p className="absolute bg-green-500 text-white rounded-full text-sm px-2  m-2">
          {car?.condition}
        </p>
        <img
          src={car?.images[0]?.imageUrl}
          width={"100%"}
          height={300}
          className="rounded-t-xl h-[180px] object-cover"
        />
        <div className="p-4">
          <h2 className="font-bold text-black mb-2 text-lg">
            {car?.listingTitle}
          </h2>
          <Separator className="m-2" />

          <div className="grid grid-cols-2 md:grid-cols-3 mt-5  gap-3 md:gap-10">
            <div className="flex flex-col items-center">
              <LuFuel className="text-lg mb-2" />
              <p>{car?.mileage} Miles</p>
            </div>
            <div className="flex flex-col items-center">
              <MdSpeed className="text-lg mb-2" />
              <p>{car?.fuelType}</p>
            </div>
            <div className="flex flex-col items-center">
              <GiGearStickPattern className="text-lg mb-2" />
              <p>{car?.transmission}</p>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            <h2 className="font-bold text-xl">${car?.sellingPrice}</h2>
            <h2 className="text-primary cursor-pointer text-sm flex items-center gap-2">
              View Details <MdOutlineOpenInNew className="text-lg" />
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarItem;
