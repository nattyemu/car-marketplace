import Header from "@/components/Header";
import Service from "@/Shared/Service";
import { db } from "../../../configs";
import { CarImages, CarListing } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailHeader from "../components/DetailHeader";
import ImageGallery from "../components/ImageGallery";
import Description from "../components/Description";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Specification from "../components/Specification";
import Footer from "@/components/Footer";
import OwnesDetail from "../components/OwnesDetail";
import FinancialCalculator from "../components/FinancialCalculator";
import MostSearchedCar from "@/components/MostSearchedCar";

const ListingDetail = () => {
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState(null);

  const GetCarDetails = async () => {
    try {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.id, id));

      const resp = Service.FormatResult(result);
      setCarDetail(resp[0]);
      // console.log(resp[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetCarDetails();
  }, [id]);

  return (
    <div>
      <Header />
      {/* Header Detail Component */}
      <div className=" p-10 md:px-20">
        <DetailHeader carDetail={carDetail} />
        <div className="grid grid-cols-1 md:grid-cols-3  w-full mt-10 gap-5">
          {/* left */}
          <div className="md:grid col-span-2">
            {/* Image Gallery  */}
            <ImageGallery carDetail={carDetail} />
            {/* description */}
            <Description carDetail={carDetail} />
            {/* feature */}
            <Features features={carDetail?.features} />

            {/* FinancialCalculator */}
            <FinancialCalculator carDetail={carDetail} />
          </div>

          {/* right */}

          <div>
            {/* pricing */}
            <Pricing carDetail={carDetail} />
            {/* car specification */}
            <Specification carDetail={carDetail} />
            {/* owners detail */}
            <OwnesDetail carDetail={carDetail} />
          </div>
        </div>
        <MostSearchedCar />
      </div>
      <Footer />
    </div>
  );
};

export default ListingDetail;
