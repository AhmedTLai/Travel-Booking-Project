import { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { NavLink , Link } from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext';
import api from '../../assets/data/api_Url_Config';
const Navbar = () => {
  const [position, setPosition] = useState(false);

  const {currentUser} = useContext(AuthContext)

  const NavbarScrollHandler = () => {
    if (window.scrollY > 50) {
      setPosition(true);
    } else {
      setPosition(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', NavbarScrollHandler);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', NavbarScrollHandler);
    };
  }, []);

   
  const Logout = async()=>{
    const logoutP = await api.post('/user/logout')
    if(logoutP){
      localStorage.removeItem('Auth_token');
      location.reload()
    }else{
      console.log('the user is not loged in')
    }
    
  }


  return (
    <nav className={position ? 'y':'n'}>
    <nav className={position ?"navbar navbar-expand-lg navbar-light nvb" : 'navbar navbar-expand-lg navbar-light nvbOff'} >
  <div className="container">
    <Link className="navbar-brand" to="/">
      <img src="/images/logo.png" alt="LOGO" className="w-100 h-100 logo" />
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNav">
      <ul className="navbar-nav gap-3 mx-auto position-relative nav-links py-3">
        <li className="nav-item ">
          <NavLink to="/" className="rounded-pill btn">
            Home
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink to="/about" className="rounded-pill btn">
            About
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink to="/tours" className="rounded-pill btn">
            Tours
          </NavLink>
        </li>
      </ul>
      
      {
        !currentUser ?
        <div className="d-flex gap-3 btns">
        <Link to="/login" className="btn rounded-pill">
          Login
        </Link>
        <Link to="/register" className="btn rounded-pill reg">
          Register
        </Link>
        
      </div>
      :
      <div className='d-flex mx-auto justify-content-center  py-1 px-1'>
        <div className="dropdown open  ">
        <button className="btn bg text-white dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
              {currentUser.fullname}
            </button>
        <div className="dropdown-menu" aria-labelledby="triggerId">
          <button className="dropdown-item" href="#" onClick={Logout}><i className='fa-solid fa-circle-xmark mainTextColor'></i> Logout</button>
          <Link to='/edit-profile' className="dropdown-item"><i className='fa-solid fa-gear mainTextColor'></i> Profile Settings</Link >
        </div>
      </div>
      </div>
      }
    </div>
  </div>
</nav>
</nav>
  )
}

export default Navbar