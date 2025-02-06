import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import TrustedBy from "../components/TrustedBy";
import WorkProcess from "../components/WorkProcess";
import TestimonialSlider from "../components/TestimonialSlider";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustedBy />
      <WorkProcess />
      <TestimonialSlider />
    </>
  );
};

export default Home;
