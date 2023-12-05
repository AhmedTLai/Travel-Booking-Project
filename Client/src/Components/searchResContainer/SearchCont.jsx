import { useEffect, useState } from 'react'
import './SearchCont.css'
import { useParams } from 'react-router-dom'
import api from '../../assets/data/api_Url_Config'
import DirectionCards from '../Directions/DirectionCards'
// import { justify } from '@cloudinary/url-gen/qualifiers/textAlignment'


const SearchCont = () => {
    const params = useParams()
    const [cards,setCards] = useState([])
    const [loading , setLoading] = useState(false)
    
    useEffect(()=>{
        const abort = new AbortController()
        
        
        const getData = async()=>{
        
        try{
          setLoading(true)
            await api.get(`/tour/tours-search/${params.location}/${params.distance}/${params.maxgroupsize}`,{signal : abort.signal})
           .then(res =>
            setCards(res.data)
           )
           .catch(err => console.log(err))
                
           setLoading(false)
        }catch(err){
            console.log(err)
        }
      }
      getData()

        return ()=>{
            abort.abort
        }
    
      }
    
    ,[params])

    

  return (
    <div className='container py-5 my-5'>
        <div className='d-flex flex-wrap gap-3 position-relative' style={cards.length < 3 ?{justifyContent : 'center'} : ''}>
        {cards.length > 0 ? (
          cards.map((val, ind) => <DirectionCards key={ind} val={val} />)
        ) : (
          <h3 className='text-center w-100'>{loading ? <img style={{maxHeight : '70px'}} className='h-100' src='/images/Loading.svg'/> : "No data yet"}</h3>
        )}
        </div>
    </div>
  )
}

export default SearchCont