import React, { useEffect, useState } from "react";

const ImageGallery = ({ carDetail }) => {
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    setImageUrl(carDetail?.images[0]?.imageUrl);
    // console.log(carDetail);
  }, [carDetail]);
  return (
    <div>
      {carDetail?.images[0] ? (
        <div className="grid grid-cols-6 gap-1 ">
          <div>
            {carDetail?.images.map((image, index) => (
              <img
                key={index}
                src={image?.imageUrl}
                className="rounded-sm w-full  mt-2 mr-2 h-[80px] object-cover cursor-pointer hover:shadow-md"
                onClick={() => setImageUrl(image?.imageUrl)}
              />
            ))}
          </div>
          <img
            src={imageUrl}
            className="w-full rounded-xl h-[300px] sm:h-[400px] md:h-[500px] object-cover col-span-5"
          />
        </div>
      ) : (
        <div className=" grid grid-cols-6 gap-3 ">
          <div>
            {[1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="rounded-sm w-full  col-span-2 mt-2 h-[80px] bg-slate-200 animate-pulse"
              ></div>
            ))}
          </div>
          <div className="w-full rounded-xl h-[300px] sm:h-[400px] md:h-[500px]  col-span-5 bg-slate-200 animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
