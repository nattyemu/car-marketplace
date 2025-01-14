import { Button } from "@/components/ui/button";
import React from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
const Pricing = ({ carDetail }) => {
  // console.log(carDetail);
  return (
    <div className=" rounded-xl border shadow-md w-full">
      {carDetail?.sellingPrice ? (
        <div className="p-10">
          <h2>Our Price</h2>
          <h2 className="font-bold text-4xl">$ {carDetail?.sellingPrice}</h2>
          <Button className="w-full mt-7 " size="lg">
            <MdOutlineLocalOffer className="mr-2  md:text-lg" /> Make an Offer
            Price
          </Button>
        </div>
      ) : (
        <div className="bg-slate-200 animate-pulse w-full h-[250px] md:h-[200px]"></div>
      )}
    </div>
  );
};

export default Pricing;
