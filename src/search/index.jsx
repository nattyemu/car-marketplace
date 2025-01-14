import Service from "@/Shared/Service";
import { db } from "../../configs";
import { CarImages, CarListing } from "../../configs/schema";
import { and, eq, gt, lt } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import CarItem from "@/components/CarItem";
import Search from "@/components/Search";

const SearchByOptions = () => {
  const [searchParams] = useSearchParams();

  const make = searchParams.get("make");
  const condition = searchParams.get("cars");
  const price = searchParams.get("price");

  const [carList, setCarList] = useState([]);
  // console.log(make, condition, price);
  const GetCarList = async () => {
    try {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(
          and(
            condition != undefined && eq(CarListing?.condition, condition),
            price != undefined && lt(CarListing?.sellingPrice, Number(price)),
            make != undefined && eq(CarListing?.make, make)
          )
        );

      const resp = Service.FormatResult(result);
      setCarList(resp);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // console.log(carList);
    GetCarList();
  }, []);
  return (
    <div>
      <Header />
      <div className="p-16 bg-gray-400 flex justify-center w-full">
        <Search />
      </div>
      <div className=" p-10 md:p-20">
        <h2 className="font-bold text-3xl md:text-4xl ">Search Result</h2>
        {/* list of category */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">
          {carList?.length > 0
            ? carList?.map((car, index) => (
                <div key={index}>
                  <CarItem car={car} />
                </div>
              ))
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="h-[400px] rounded-xl bg-slate-200 animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SearchByOptions;
