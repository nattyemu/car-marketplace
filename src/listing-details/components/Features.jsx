import React from "react";
import { FaCheck } from "react-icons/fa";
const Features = ({ features }) => {
  // if (!features) {
  //   return <div>Loading...</div>;
  // }
  // console.log(features);
  return (
    <div>
      {features ? (
        <div className="p-10 rounded-xl bg-white shadow-md mt-6 border">
          <h2 className="font-medium my-2 text-xl md:text-2xl">Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6 mt-5">
            {Object.entries(features).map(([feature, value]) => (
              <div key={feature} className="flex gap-2 items-center">
                <h2>
                  <FaCheck className="text-lg bg-blue-100 rounded-full p-0.5 text-primary" />
                  {feature}
                </h2>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-10 rounded-xl bg-slate-200  shadow-md mt-7 border  animate-pulse h-[900px] w-full sm:h-[800px] md:h-[700px] lg:h-[400px]"></div>
      )}
    </div>
  );
};

export default Features;
