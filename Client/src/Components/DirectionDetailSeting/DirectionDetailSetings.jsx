import { Link,useNavigate,useParams } from 'react-router-dom'
import './DirectionDetailSetings.css'
import api from '../../assets/data/api_Url_Config'
import { useEffect, useState } from 'react'


const list = [
    {
        name : 'edit',
        Iclass: 'fa-solid fa-edit',
        text : 'Edit Tour Post',
        link : '/tours/edit/'
    },
    {
        name : 'delete',
        Iclass : 'fa-solid fa-delete-left',
        text : 'Delete Tour Post',
        link : '/tours/delete/'
    }
]

const DirectionDetailSetings = () => {
    const [DPage , setDPage] = useState()
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        if(DPage){
            document.body.style.overflowY = 'hidden'
        }else{
            document.body.style.overflowY = 'visible'
        }
    },[DPage])
    const SureHundle = async (e)=>{
       
        if(e.target.name == 'no'){
            setDPage(false)
        }else{
           await api.delete(`tour/delete-tour/${id}`)
           setDPage(false)
           document.body.style.overflowY = 'visible'
           navigate('/tours')
        }
    }

   
    

  return (
    <div className={`py-3 px-3 position-fixed start-0 settings word-break`} style={{zIndex : 99}}>
        <button className='toggler btn py-0 px-0 rounded-circle'><i className='fa-solid fa-gear text-white rounded-circle bg py-3 px-3'></i></button>
    <div className='position-fixed menu border bg-white text-dark py-2 px-1'>
        
              <li > 
              <Link to={list[0].link+id}  className='list-set my-0'><h5 className='d-flex gap-3 py-2 px-2'><i className={`${list[0].Iclass} mainTextColor`}></i> {list[0].text}</h5></Link>
            </li>
            <li>
            <h5 className='d-flex gap-3 py-2 px-2 delete' onClick={()=>{setDPage(true)}}><i className={`${list[1].Iclass} mainTextColor`}></i> {list[1].text}</h5>
            </li>
        
    </div>
    <div className={`position-fixed w-100 h-100 sure ${DPage ? 'visiblePage' : 'invisiblePage'}`}>
        <div className='bg-white container w-100 py-3 px-5 rounded-3'>
            <h1>Are you sure you want to delete it ?

            </h1>
    <div className='d-flex' >
    <button className='btn bg-white border-secondary py-3 my-3 w-100 fs-4' name='no' onClick={SureHundle}>no</button>
    <button className='btn bg text-white w-100 my-3 py-3 fs-4 y' name='yes' onClick={SureHundle}>yes</button>
    </div>
    </div>
    </div>
    </div>
  )
}

export default DirectionDetailSetings