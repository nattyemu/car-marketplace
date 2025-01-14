import Header from "@/components/Header";
import Search from "@/components/Search";
import { db } from "../../../configs";
import { CarImages, CarListing } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Service from "@/Shared/Service";
import CarItem from "@/components/CarItem";

const SearchByCategory = () => {
  const { category } = useParams();
  const [carList, setCarList] = useState();
  // console.log(category);

  useEffect(() => {
    GetCarList();
  }, [category]);
  const GetCarList = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.category, category));
    const resp = Service.FormatResult(result);
    setCarList(resp);
    // console.log(carList);
  };
  return (
    <div>
      <Header />
      <div className="p-16 bg-gray-400 flex justify-center ">
        <Search />
      </div>
      <div className=" p-10 md:p-20">
        <h2 className="font-bold text-3xl md:text-4xl ">{category}</h2>
        {/* list of category */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">
          {carList?.length > 0
            ? carList?.map((car, index) => (
                <div key={index}>
                  <CarItem car={car} />
                </div>
              ))
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div className="h-[400px] rounded-xl bg-slate-200 animate-pulse"></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SearchByCategory;
