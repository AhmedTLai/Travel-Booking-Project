import { useParams } from "react-router-dom"
// import cards from '../../../public/data/cards.json'
import Comments from "./Comments"
import './DirectionDetail.css'
import BookingForm from '../BookingForm/BookingFrom'
import { useContext, useEffect, useState } from "react"
import api from "../../assets/data/api_Url_Config"
import DirectionDetailSetings from "../DirectionDetailSeting/DirectionDetailSetings"
import {AuthContext} from '../../Context/AuthContext'
import { Cloudinary } from "@cloudinary/url-gen"
import {AdvancedImage} from '@cloudinary/react';

const DirectionDetail = () => {
const [cards ,setCards] = useState([])
const {currentUser} = useContext(AuthContext)
  useEffect(() => {
    try {
      api
        .get('/tour/get-tour')
        .then((res) => setCards(res.data))
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  }, []);

    const {id} = useParams()
    const data = cards.find(val=> val.tour_id == id)
 

    const cld = new Cloudinary({
      cloud: {
        cloudName: 'dwkxpjgor'
      }
    }); 
    const pic = data?.photo+'.jpg'
    const myImage = cld.image(pic,{ responsive_breakpoints: { 
      transformation: { crop: 'cover', aspect_ratio: '16:9', gravity: 'auto' } 
    }}).setVersion('1701267061');

  return (
    <div className="container py-5 d-flex gap-3">
        <div className="innerContainer">
        <div className="w-100 me-auto mb-4 ">
        <AdvancedImage cldImg={myImage} alt="pic" className="rounded-3 w-100 objectFitC" />
        </div>

        <div className="border rounded-3 py-4 px-4">
            <h3 className="mb-4">{data?.title}</h3>
            <div className="d-flex justify-content-between flex-wrap w-50">
            <p ><i className="fa-solid fa-star mainTextColor "></i>4.5(2)</p>
            <p><i className="fa-solid fa-user border rounded-circle py-1 px-1 border-dark"></i> {data?.city}</p>
            </div>
            <div className="d-flex justify-content-between w-100 py-3 mb-3 gap-2 flex-wrap" style={{maxWidth : '100%'}}>
              <p className="w-100" style={{maxWidth : '200px'}} ><i className="fa-solid flex1 fa-location-dot"></i> {data?.city}</p>
              <p className="w-100 d-flex align-items-center gap-1" style={{maxWidth : '200px', position : 'relative' , left : '-50px'}} ><i className="fa-solid flex1 fa-dollar-sign border border-dark rounded-circle w-100 text-center" style={{maxWidth : '17px' ,maxHeight : '17px', minHeight : '17px',minWidth : '17px'}}></i> {data?.price} DZD/per_person</p>
              <p className="w-100 d-flex align-items-center gap-1" style={{maxWidth : '30px'}} ><i className="fa-solid flex1 fa-clock"></i> {data?.distance}Km</p>
              <p className="w-100 d-flex align-items-center gap-1" style={{maxWidth : '50px'}} ><i className="fa-solid flex1 fa-user"></i> {data?.maxGroupSize} persons</p>
            </div>
            <div>
              <h3 className="d-inline-flex mb-3">Description</h3>
              <p className="home-text">{data?.desc}</p>

            </div>
        </div>
        <Comments />
        </div>
        <BookingForm data={data}/>
        {currentUser?.admin ? <DirectionDetailSetings /> : ''}
    </div>
  )
}

export default DirectionDetail