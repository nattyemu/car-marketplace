import { storage } from "../../../configs/firebaseConfig";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { db } from "../../../configs/index";
import { CarImages } from "../../../configs/schema";
import { eq } from "drizzle-orm";

const UploadImagesFroEdit = ({
  setLoader,
  triggerUploadImgages,
  mode,
  carInfo,
}) => {
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [editCarImageList, setEditCarImageList] = useState([]);

  useEffect(() => {
    // console.log(carInfo);
    if (mode == "edit") {
      setEditCarImageList([]);
      carInfo?.images.forEach((image) => {
        setEditCarImageList((pre) => [...pre, image.imageUrl]);
        // console.log(image);
      });
    }
    // console.log(editCarImageList);
  }, [carInfo]);
  useEffect(() => {
    if (triggerUploadImgages) {
      UploadImages();
    }
  }, [triggerUploadImgages]);

  const onFileSelected = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files?.length; i++) {
      let file = files[i];
      setSelectedFileList((pre) => [...pre, file]);
    }
  };
  const removeImageFile = (image, index) => {
    const result = selectedFileList.filter((item) => item != image);
    setSelectedFileList(result);
  };

  const UploadImages = () => {
    setLoader(true);
    selectedFileList.forEach((file) => {
      const fileName = Date.now() + ".jpeg";
      const storageRef = ref(storage, "car-marketplace/" + fileName);
      const metaData = {
        contentType: "image/jpeg",
      };
      try {
        uploadBytes(storageRef, file, metaData)
          .then((snapshot) => {
            console.log("uploaded image to firebase");
          })
          .then((resp) =>
            getDownloadURL(storageRef).then(async (downloadUrl) => {
              console.log(downloadUrl);
              if (mode == "edit") {
                try {
                  await db.insert(CarImages).values({
                    imageUrl: downloadUrl,
                    carListingId: carInfo?.id,
                  });

                  console.log("new image inserted");
                } catch (error) {
                  console.log("Error inserting new image:", error);
                }
              } else {
                await db.insert(CarImages).values({
                  imageUrl: downloadUrl,
                  carListingId: triggerUploadImgages,
                });
                console.log("New image inserted for new car listing");
              }
            })
          );
      } catch (error) {
        console.log("uploaded image to firebase failed:", error);
      }
    });
    setLoader(false);
  };
  const removeImageFileFromDb = async (image, index) => {
    // console.log(carInfo?.images[index].id);
    const result = await db
      .delete(CarImages)
      .where(eq(CarImages.id, carInfo?.images[index]?.id));
    const editImage = editCarImageList.filter((item) => item != image);
    setEditCarImageList(editImage);
  };
  return (
    <div>
      <h2 className="font-medium text-xl my-6">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {mode == "edit" &&
          editCarImageList.map((image, index) => (
            <div key={index}>
              <IoCloseCircleSharp
                className="absolute m-2  rounded-full cursor-pointer text-2xl hover:text-red-500 "
                onClick={() => removeImageFileFromDb(image, index)}
              />

              <img
                src={image}
                className="w-full h-[110px] object-cover rounded-xl"
              />
            </div>
          ))}
        {selectedFileList.map((image, index) => (
          <div key={index}>
            <IoCloseCircleSharp
              className="absolute m-2  rounded-full cursor-pointer text-2xl hover:text-red-500 "
              onClick={() => removeImageFile(image, index)}
            />

            <img
              src={URL.createObjectURL(image)}
              className="w-full h-[110px] object-cover rounded-xl"
            />
          </div>
        ))}
        <label htmlFor="uploadImage">
          <div className="flex  bg-blue-200  p-10 text-primary justify-center rounded-xl border border-dotted border-primary cursor-pointer hover:shadow-md">
            <h2 className="text-lg text-center">+</h2>
          </div>
        </label>
        <input
          type="file"
          id="uploadImage"
          className="opacity-0"
          multiple={true}
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
};
export default UploadImagesFroEdit;
