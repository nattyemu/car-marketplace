import React from "react";
import Header from "../components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import MyListing from "./component/MyListing";
import Inbox from "./component/Inbox";

const Profile = () => {
  return (
    <div>
      <Header />
      <div className="px-10 md:z-20 my-10">
        <Tabs defaultValue="my-lising" className="w-full">
          <TabsList className="w-full flex justify-start">
            <TabsTrigger value="my-lising">My Listing</TabsTrigger>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="my-lising">
            <MyListing />
          </TabsContent>
          <TabsContent value="inbox">
            <Inbox />
          </TabsContent>
          <TabsContent value="profile">profile</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
