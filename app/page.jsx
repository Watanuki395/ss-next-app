import * as React from "react";
import HeroSection from "../components/landing/HeroSection";
import FeaturesGrid from "../components/landing/FeaturesGrid";
import HowItWorks from "../components/landing/HowItWorks";

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturesGrid />
      <HowItWorks />
    </>
  );
};

export default Home;
