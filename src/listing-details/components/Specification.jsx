import IconField from "@/add-listing/component/IconField";
import CarSpecification from "@/Shared/CarSpecification";
import React from "react";

const Specification = ({ carDetail }) => {
  // console.log(carDetail);
  return (
    <div className=" rounded-xl border shadow-md mt-7">
      {carDetail ? (
        <div className="p-10">
          <h2 className="font-medium my-2 text-xl lg:text-2xl">
            Spesifications
          </h2>
          {CarSpecification.map((item, index) => (
            <div
              key={index}
              className="mt-5 flex md:flex-col lg:flex-row justify-between"
            >
              <h2 className="flex  gap-2 items-center">
                <IconField icon={item?.icon} />
                {item?.label}
              </h2>
              <h2>{carDetail?.[item?.name]}</h2>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-10 bg-slate-200 animate-pulse w-full h-[750px] sm:h-[600px] md:h-[500px] lg:h-[550px]"></div>
      )}
    </div>
  );
};

export default Specification;
