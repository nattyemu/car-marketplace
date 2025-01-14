import { UserButton, SignInButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, isAuthenticated } = useUser();

  // console.log("isAuthenticated:", isAuthenticated);
  // console.log("user:", user?.fullName);

  return (
    <div className="flex justify-between items-center shadow-sm p-5 ">
      <Link to={"/"}>
        <img src="/logo.svg" width={50} height={50}></img>
      </Link>

      <ul className="hidden md:flex gap-16 justify-center items-center p-5">
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Home
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Search
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          New
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Preowned
        </li>
      </ul>
      {/* for deploy */}

      {user ? (
        <div className="flex items-center gap-5">
          <UserButton />
          <Link to={"/profile"}>
            <Button className="m-1">Submit Listing</Button>
          </Link>
        </div>
      ) : (
        <SignInButton mode="modal" forceRedirectUrl="/profile">
          <Button>Submit Listing</Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Header;
