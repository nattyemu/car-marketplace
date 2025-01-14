import React from "react";
import { Button } from "./components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Category from "./components/Category";
import MostSearchedCar from "./components/MostSearchedCar";
import InfoSection from "./components/InfoSection";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Hero */}
      <Hero />
      {/* catagory */}
      <Category />
      {/* MostSearchedCar */}
      <MostSearchedCar />
      {/* InfoSection */}
      <InfoSection />
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;
