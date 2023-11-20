import {Link} from 'react-router-dom'
import './ThankYou.css'

const ThankYou = () => {
  return (
    <section className="d-flex align-items-center justify-content-center container py-5 my-5" style={{minHeight : '50vh'}}>
        <article className='text-center'>
            <h1 className="d-inline-block px-1 text-success"><i className="fa-regular fa-circle-check check"></i></h1>
            <br />
            <br />
            <h1 className="TankYouT">Thank You</h1>
            <br /> 
            <h4>Your tour is booked</h4>
            <br />
            <Link to='/' className='btn bg text-white w-100'>Back to home</Link>
        </article>
    </section>
  )
}

export default ThankYou