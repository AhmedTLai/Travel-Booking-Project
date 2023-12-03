import ToursHero from '../Components/ToursHeroSection/ToursHero'
import SearchBar from '../Components/SearchBar/SearchBar'
import SearchCont from '../Components/searchResContainer/SearchCont'

const SearchResPage = () => {
  return (
    <>
    <ToursHero page={'search-tour'}/>
    <div className="container">
    <SearchBar page='tour'/>
    </div>
    <SearchCont />
    </>
  )
}

export default SearchResPage