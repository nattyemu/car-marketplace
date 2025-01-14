import React, { useEffect, useState } from "react";

import CarDetails from "../Shared/carDetails.json";
import Features from "../Shared/features.json";
import InputField from "./component/InputField";
import DropDownField from "./component/DropDownField";
import TextArea from "./component/TextArea";
import { Separator } from "@/components/ui/separator";

import UploadImages from "./component/UploadImages";
import IconField from "./component/IconField";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ImSpinner8 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { CarImages, CarListing } from "./../../configs/schema";
import { eq } from "drizzle-orm";
import { db } from "./../../configs";
import Service from "@/Shared/Service";

import { toast } from "sonner";
import UploadImagesFroEdit from "./component/UploadImagesFroEdit";

const AddListing = () => {
  const [formData, setFormData] = useState([]);
  const [featuresData, setFeaturesData] = useState([]);
  const [triggerUploadImgages, setTriggerUploadImgages] = useState();
  const [loder, setLoader] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const [carInfo, setCarInfo] = useState(null);
  const [searchParmams] = useSearchParams();
  const mode = searchParmams.get("mode");
  const recordId = searchParmams.get("id");

  useEffect(() => {
    if (mode == "edit") {
      GetListingDetail();
    }
  }, []);
  const GetListingDetail = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, recordId));

    const resp = Service.FormatResult(result);
    setCarInfo(resp[0]);
    setFormData(resp[0]);
    // console.log(resp[0]);
    setFeaturesData(resp[0].features);
  };

  const handleInputChange = (name, value) => {
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const handleFeatureChange = (name, value) => {
    setFeaturesData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const onSubmit = async (event) => {
    setLoader(true);
    toast("plase wait...");
    event.preventDefault();
    if (mode == "edit") {
      try {
        const result = await db
          .update(CarListing)
          .set({
            ...formData,
            features: featuresData,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            postedON: moment().format("DD/MM/yyyy"),
          })
          .where(eq(CarListing.id, recordId))
          .returning({ id: CarListing.id });
        // navigate("/profile");
        if (result) {
          console.log("data updated ");
          setTriggerUploadImgages(result[0].id);
        }
        console.log("data updated ");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const result = await db
          .insert(CarListing)
          .values({
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            postedON: moment().format("DD/MM/yyyy"),
          })
          .returning({ id: CarListing.id });
        if (result) {
          console.log("data saved");
          setTriggerUploadImgages(result[0].id);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setLoader(false);
  };
  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl"> Add New Listing</h2>
        <form className="border p-10 mt-10 rounded-xl">
          {/* car details */}
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
              {CarDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <div className="flex gap-3 items-center">
                    <IconField icon={item?.icon} />
                    <h2 className="text-sm">
                      {item?.label}
                      {item.required && (
                        <span className="text-red-600"> *</span>
                      )}
                    </h2>
                  </div>
                  {item.fieldType == "text" || item.fieldType == "number" ? (
                    <InputField
                      carInfo={carInfo}
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType == "dropdown" ? (
                    <DropDownField
                      carInfo={carInfo}
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType == "textarea" ? (
                    <TextArea
                      carInfo={carInfo}
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* features list */}
          <Separator className="my-6" />
          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-3 md:gap-6">
              {Features?.features?.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type={item?.fieldType}
                    required={item?.required}
                    name={item?.name}
                    checked={!!featuresData?.[item?.name]}
                    onChange={(value) =>
                      handleFeatureChange(item?.name, value.target.checked)
                    }
                  />
                  <h2>{item?.label}</h2>
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
          {/* car image */}

          {carInfo && mode == "edit" ? (
            <UploadImagesFroEdit
              carInfo={carInfo}
              mode={mode}
              triggerUploadImgages={triggerUploadImgages}
              setLoader={(v) => {
                setLoader(v);
                navigate("/profile");
              }}
            />
          ) : (
            <UploadImages
              triggerUploadImgages={triggerUploadImgages}
              setLoader={(v) => {
                setLoader(v);
                navigate("/profile");
              }}
            />
          )}

          <div className="mt-10 flex justify-end">
            <Button disabled={loder} onClick={(e) => onSubmit(e)}>
              {!loder ? "Submit" : <ImSpinner8 className="animate-spin" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
