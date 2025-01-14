import React from "react";

const Description = ({ carDetail }) => {
  return (
    <div>
      {carDetail?.listingDescription ? (
        <div className="p-10 rounded-xl bg-white shadow-md mt-6 border">
          <h2 className="font-medium my-2 text-xl md:text-2xl">Descripton</h2>
          <p>{carDetail?.listingDescription}</p>
        </div>
      ) : (
        <div className="bg-slate-200 animate-pulse w-full h-[150px] mt-7 rounded-xl"></div>
      )}
    </div>
  );
};

export default Description;
