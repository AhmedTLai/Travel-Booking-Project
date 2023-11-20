import ToursHero from "../Components/ToursHeroSection/ToursHero"
import Directions from "../Components/Directions/Directions"
import SearchBar from "../Components/SearchBar/SearchBar"

const Tours = () => {
  return (
    <>
    <ToursHero />
    <div className="container">
    <SearchBar page='tour'/>
    </div>
    <Directions page='tour'/>
    </>
  )
}

export default Tours