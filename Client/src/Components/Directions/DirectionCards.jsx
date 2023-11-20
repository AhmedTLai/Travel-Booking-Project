// import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const DirectionCards = (info) => {

    const {val} = info
    const navigate = useNavigate()
    const HundleBookPage = (e)=>{
      e.preventDefault();
      navigate(`/tours/book/${val?.tour_id}`,{state : val})
    }

  return (
    <>

    <div className="card" style={{minWidth : '26.3rem',maxWidth : '26.3rem'}}>
      <div className='imgcont w-100 overflow-hidden border' style={{maxHeight : '250px'}}>
        <img src={'/upload/'+val.photo} alt="pic" className="card-img-top"/>
        </div>
        <div className="card-body">
            <div className="d-flex justify-content-between align-items-center px-3 py-1">
        <h5 className="d-flex gap-2 card-title"><i className="fa-regular fa-location-dot mainTextColor"></i>{val.city}</h5>
        <p>{val.rate} <i className="fa-solid fa-star mainTextColor"></i></p>
        </div>
        <h4>{val.city + ', ' +  val.title}</h4>
        <div className="py-3 px-3 d-flex justify-content-between align-items-center">
        <h5>{val.price}$ /per person</h5>
        <button onClick={HundleBookPage} className='btn bg rounded-pill text-white'>Book Now</button>
        </div>
        </div>
    </div>
    
    </>
  )
}

export default DirectionCards