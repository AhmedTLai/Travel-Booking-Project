import { Link } from 'react-router-dom'
import './Footer.css'

const columns = [
  {
    title : 'Discover',
    div:[{name : 'Home'},{name : 'About'},{name : 'Tours'}]
  },
  {
    title : 'Quick Links',
    div:[{name : 'Gallery'},{name : 'Register'},{name : 'Login'}]
  },
  {
    title : 'Contact',
    div:[{name : <><i className='fa-solid fa-location-dot'></i> <span>Address : your_location</span></>},
    {name : <><i className='fa-solid fa-envelope'></i> <span>Email : your@Email.com</span></>},
    {name : <><i className='fa-solid fa-phone'></i> <span>Phone : 05-55-55-55-55</span></>}]
  },
]

const Footer = () => {
  return (
    <footer>
    <div className='container py-5 d-flex flex-wrap gap-3 border-top'>
      <div className='flex1 border-end'>
      <Link className="border-0"  to="/">
      <img src="/images/logo_batcheditor_fotor.webp" alt="LOGO" className="w-100 mb-4 logo" />
    </Link>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
    <br />
    <br />
    <ul className='d-flex align-items-center footer_list gap-4 border py-3 px-2 me-2 justify-content-center'>
    <li><i className='fa-brands fa-youtube'></i></li>
    <li><i className='fa-brands fa-github'></i></li>
    <li><i className='fa-brands fa-facebook'></i></li>
    <li><i className='fa-brands fa-instagram'></i></li>
    </ul>
    <br />
      </div>
      {columns.map((val,ind)=>(
        <div key={ind} className='flex1 border-end'>
          <h3>{val.title}</h3>
          <br />
          {val.div.map((v,i)=>(
            <>
            {( val.title == 'Quick Links' || val.title == 'Discover' ) && v.name == 'Home' ? 
            
            <li key={i} className='mb-3'><Link to={'/'}>{v.name}</Link></li>
            :
            ( val.title == 'Quick Links' || val.title == 'Discover' ) && v.name != 'Home' ?
            <li key={i} className='mb-3'><Link to={'/'+v.name.toLowerCase()}>{v.name}</Link></li>
            : <li key={i} className='mb-3'>{v.name}</li>}
            
            </>
          ))}
        </div>
      ))}
      
    </div>
    <div className='d-flex justify-content-center py-3 border-top text-center' style={{background : '#dbeeff'}}>
            <h5>© 2023 Tlaidjia-Ahmed. All rights reserved.</h5>
      </div>
    </footer>
  )
}

export default Footer