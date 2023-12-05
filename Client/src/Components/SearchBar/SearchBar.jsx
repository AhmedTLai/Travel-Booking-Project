import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './SearchBar.css'

const inputs = [
    {
        type : 'text',
        placeHolder : 'Where you want to go ?',
        name : 'location',
        icon : <i className='fa-solid fa-location'></i>
    },
    {
        type : 'number',
        placeHolder : 'Distance k/m',
        name : 'distance',
        icon :<i className="fa-solid fa-timeline"></i>
    },
    {
        type : 'number',
        placeHolder : 'Max People',
        name : 'maxgroupsize',
        icon : <i className="fa-solid fa-users-line"></i>
    },
]

const SearchBar = (info) => {
    const {page} = info
    const [inp , setInp] = useState()
    const navigate = useNavigate()

    const HundleInp = (e)=>{
        setInp(prev => ({...prev,[e.target.name] : e.target.value}))
    }

    const HundleSubmit = (e)=>{
        e.preventDefault();
        navigate(`/search-result/${inp.location}/${inp.distance}/${inp.maxgroupsize}`)    
    }

  return (
    
    <form onSubmit={HundleSubmit} className={page!='tour' ?'FormSearch gap-3 align-items-center position-relative ' : 'FormSearch gap-3 align-items-center position-relative container mt-5 mb-3 ms-0'}>
            <div className='w-100 h-100 position-absolute shadowBox' style={{bottom : '-30px',left : '0px',background : '#777',opacity : '0.8',pointerEvents : 'none'}}/>
            
            {inputs.map((val,ind)=>(
                <div key={ind} className='d-flex gap-2 align-items-center py-2 position-relative'>
                    <span className='text-danger h-100 fs-3'>{val.icon}</span>
                    <input type={val.type} name={val.name} placeholder={val.placeHolder} className='form-control btn' onChange={HundleInp}/>
                </div>
            ))}
            <div className="w-100 d-flex justify-content-center">
            <button className="btn bg " aria-label="Search"><i className="fa-solid fa-magnifying-glass text-white"></i></button>
            </div>
        </form>
  )
}

export default SearchBar