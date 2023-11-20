
const inputs = [
    {
        type : 'text',
        placeHolder : 'Where you want to go ?',
        icon : <i className='fa-solid fa-location'></i>
    },
    {
        type : 'number',
        placeHolder : 'Distance k/m',
        icon :<i className="fa-solid fa-timeline"></i>
    },
    {
        type : 'number',
        placeHolder : 'Max People',
        icon : <i className="fa-solid fa-users-line"></i>
    },
]

const SearchBar = (info) => {
    const {page} = info
  return (
    
    <div className={page!='tour' ?'d-flex gap-3 align-items-center position-relative ' : 'd-flex gap-3 align-items-center position-relative container mt-5 mb-3 ms-0'}>
            <div className='w-100 h-100 position-absolute' style={{bottom : '-30px',left : '0px',filter : 'blur(50px)',background : '#777',opacity : '0.8',pointerEvents : 'none'}}/>
            {inputs.map((val,ind)=>(
                <div key={ind} className='d-flex gap-2 align-items-center'>
                    <span className='text-danger h-100 fs-3'>{val.icon}</span>
                    <input type={val.type} placeholder={val.placeHolder} className='form-control btn' />
                </div>
            ))}
            <button className="btn bg"><i className="fa-solid fa-magnifying-glass text-white"></i></button>
        </div>
  )
}

export default SearchBar