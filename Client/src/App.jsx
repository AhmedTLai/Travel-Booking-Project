
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer/Footer'
import Navbar from './Components/Navbar/Navbar'
import HomePage from './Pages/HomePage'
import Tours from './Pages/Tours'
import BookPage from './Pages/BookPage'
import ThankYou from './Components/ThankYou/ThankYou'
import Login from './Pages/login/Login'
import Register from './Pages/login/Register'
import AddTour from './Pages/AddTour'
import EditTour from './Components/editTour/EditTour'
import EditProfile from './Components/EditProfile/EditProfile'

function App() {


  return (
    <>
      <Navbar />
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
      </Routes>        

      <Footer />
    </>
  )
}

export default App
