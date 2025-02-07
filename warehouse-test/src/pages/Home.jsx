import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import TrustedBy from "../components/TrustedBy";
import WorkProcess from "../components/WorkProcess";
import TestimonialSlider from "../components/TestimonialSlider";
import Footer from "../components/Footer";
import Services from "../components/Services";
import WebDevelopment from "../components/WebDevelopment";
import AppDevelopment from "../components/AppDevelopment";
import InstagramGallery from "../components/InstragramGallery";

const Home = () => {
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <TrustedBy />
      <div id="work-process">
        <WorkProcess />
      </div>
      
      <div id="services">
        <Services />
      </div>
      <WebDevelopment />
      <AppDevelopment />
      <InstagramGallery /> 
      <div id="testimonial-slider">
        <TestimonialSlider />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
