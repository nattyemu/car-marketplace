import React, { useEffect, useState } from "react";
import { storage } from "../../../configs/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

export const TryFirebase = () => {
  return <div>TryFirebase</div>;
};
