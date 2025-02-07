import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import TrustedBy from "../components/TrustedBy";
import WorkProcess from "../components/WorkProcess";
import TestimonialSlider from "../components/TestimonialSlider";
import Footer from "../components/Footer";
import Services from "../components/Services";
import WebDevelopment from "../components/WebDevelopment";
import AppDevelopment from "../components/AppDevelopment";

const Home = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Hero />
      <TrustedBy />
      <WorkProcess />
      <Services />
      <WebDevelopment />
      <AppDevelopment />
      <TestimonialSlider />
      <Footer />
    </div>
  );
};

export default Home;
