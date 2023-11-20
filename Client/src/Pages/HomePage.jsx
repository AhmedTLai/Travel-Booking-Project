import Directions from "../Components/Directions/Directions"
import Experience from "../Components/Experience/Experience"
import Gallery from "../Components/Gallery/Gallery"
import HeroSection from "../Components/HeroSection/HeroSection"
import NewsLetter from "../Components/NewsLetter/NewsLetter"
import Services from "../Components/Services/Services"
import Testimonials from "../Components/Testimonials/Testimonials"

const HomePage = () => {
  return (
    <>
    <HeroSection />
    <Services />
    <Directions />
    <Experience />
    <Gallery />
    <Testimonials />
    <NewsLetter />
    </>
  )
}

export default HomePage