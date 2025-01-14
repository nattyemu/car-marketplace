import { storage } from "../../../configs/firebaseConfig";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { db } from "../../../configs/index";
import { CarImages } from "../../../configs/schema";

const UploadImages = ({ setLoader, triggerUploadImgages }) => {
  const [selectedFileList, setSelectedFileList] = useState([]);

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
            console.log("uploaded file");
          })
          .then((resp) =>
            getDownloadURL(storageRef).then(async (downloadUrl) => {
              console.log(downloadUrl);
              await db.insert(CarImages).values({
                imageUrl: downloadUrl,
                carListingId: triggerUploadImgages,
              });
            })
          );
      } catch (error) {
        console.log(error);
      }
    });
    setLoader(false);
  };
  return (
    <div>
      <h2 className="font-medium text-xl my-6">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
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

export default UploadImages;
