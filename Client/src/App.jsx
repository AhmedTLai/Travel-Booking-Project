
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer/Footer'
import Navbar from './Components/Navbar/Navbar.jsx'
import HomePage from './Pages/HomePage'
import Tours from './Pages/Tours'
import BookPage from './Pages/BookPage'
import ThankYou from './Components/ThankYou/ThankYou'
import Login from './Pages/login/Login'
import Register from './Pages/login/Register'
import AddTour from './Pages/AddTour'
import EditTour from './Components/editTour/EditTour'
import EditProfile from './Components/EditProfile/EditProfile'
// import NavT from './NavT'
import Gallery from './Components/Gallery/Gallery.jsx'
import SearchResPage from './Pages/SearchResPage.jsx'
import PageNotFound from './Pages/PageNotFound.jsx'

function App() {


  return (
    <>
      <Navbar />
      {/* <NavT /> */}
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/tours' element={<Tours />}/>
        <Route path='/tours/book/:id' element={<BookPage />}/>
        <Route path='/thank-you' element={<ThankYou />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/add-tour' element={<AddTour />}/>
        <Route path='/tours/edit/:id' element={<EditTour />}/>
        <Route path='/edit-profile' element={<EditProfile />}/>
        <Route path='/gallery' element={<Gallery />}/>
        <Route path='/search-result/:location/:distance/:maxgroupsize' element={<SearchResPage />}/>
        <Route path='/*' element={<PageNotFound />}/>
      </Routes>        

      <Footer />
    </>
  )
}

export default App
