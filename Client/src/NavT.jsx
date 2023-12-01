import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
const Navlist = [
    {
        listName : 'home',
        listURL : '/'
    },
    {
        listName : 'About',
        listURL : '/about'
    },
    {
        listName : 'Contact',
        listURL : '/contact'
    },
    {
        listName : 'Pages',
        listURL : '',
        Content : 'pages you want to put'
    }
]

const NavT = () => {
    const [toggle , setToggle] = useState(false)

    const hundleClick = ()=>{
        setToggle(!toggle)
    }

  return (
    <nav className='d-flex align-items-center justify-content-between position-relative'>
        <div className='LOGO'>LOGO</div>

        <ul className='d-flex gap-3 position-relative'>

        {Navlist.map((value,index)=>(
           <> 
           {
            value.listName != 'Pages' ?
            <Link to={value.listURL} key={index} >{value.listName}</Link>    
            :
            <>
            <li onClick={hundleClick}>{value.listName}</li>
            <div className={`bg-dark text-white py-3 px-3 position-absolute ${toggle ? 'drowdownListOn' : 'drowdownListOff'}`} style={{bottom : '-70px',right : '0px'}}>
                 <p>{value.Content}</p>
            </div>
            </>
           } </>
        ))}
        </ul>

    </nav>
  )
}

export default NavT