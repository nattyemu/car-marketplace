import { Button } from "@/components/ui/button";
import Service from "@/Shared/Service";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const OwnesDetail = ({ carDetail }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const OnMessageOwnerBurronCLick = async () => {
    const ownerUserId = carDetail?.createdBy.split("@")[0];
    const userId = (user?.primaryEmailAddress?.emailAddress).split("@")[0];

    // create current user id
    try {
      await Service.CreateSendBirdUser(
        userId,
        user?.fullName,
        user?.imageUrl
      ).then((resp) => console.log(resp));
    } catch (error) {
      // console.log(error);
    }
    // owner user id
    try {
      // console.log(ownerUserId);
      await Service.CreateSendBirdUser(
        ownerUserId,
        carDetail?.userName,
        carDetail?.userImageUrl
      ).then((resp) => console.log(resp));
    } catch (error) {
      // console.log(error);
    }
    // create channel
    try {
      await Service.CreateSendBirdChannel(
        [ownerUserId, userId],
        carDetail?.listingTitle
      ).then((resp) => {
        console.log(resp);
        console.log("channel created");
        navigate("/profile");
      });
    } catch (error) {
      // console.log(error);
    }
  };
  // console.log(carDetail);
  return (
    <div className=" rounded-xl border shadow-md mt-7">
      {carDetail ? (
        <div className="p-10">
          <h2 className="font-medium mb-3 text-xl md:text-2xl">
            Owner / Deals{" "}
          </h2>
          <img
            src={carDetail?.userImageUrl}
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
          <h2 className="mt-2 font-bold sm:text-lg lg:text-xl">
            {carDetail?.userName}
          </h2>
          <h2 className="mt-2 text-gray-700">{carDetail?.createdBy}</h2>
          <Button className="w-full mt-6" onClick={OnMessageOwnerBurronCLick}>
            Message Owner
          </Button>
        </div>
      ) : (
        <div className="p-10 bg-slate-200 animate-pulse w-full h-[200px]"></div>
      )}
    </div>
  );
};

export default OwnesDetail;
