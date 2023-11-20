import { useRef, useState } from "react"

const starsReviews = [
    {name : <i className="fa-solid fa-star mainTextColor"></i>},
    {name : <i className="fa-solid fa-star mainTextColor"></i>},
    {name : <i className="fa-solid fa-star mainTextColor"></i>},
    {name : <i className="fa-solid fa-star mainTextColor"></i>},
    {name : <i className="fa-solid fa-star mainTextColor"></i>},
]

const comments = [
    {
        name : 'profileName',
        profileImg : '/images/avatar.jpg',
        rate : 4.5,
        desc : 'here description area',
        time : 'October 01,2023'
    },
    {
        name : 'profileName',
        profileImg : '/images/avatar.jpg',
        rate : 3.5,
        desc : 'here description area',
        time : 'October 01,2023'
    },
    {
        name : 'profileName',
        profileImg : '/images/avatar.jpg',
        rate : 5.0,
        desc : 'here description area',
        time : 'October 01,2023'
    }
    ,
    {
        name : 'profileName',
        profileImg : '/images/avatar.jpg',
        rate : 5.0,
        desc : 'here description area',
        time : 'October 01,2023'
    }
] 



const Comments = () => {
   
    const [commentInp,setCommentInp] = useState('')
    const [tourRate,setTourRate] = useState(0)

    const submitCommentHundle = (e)=>{
        e.preventDefault()
        alert('Rate : '+tourRate + '\nComment : ' + commentInp)
    }

  return (
    <div className="container py-3 mt-4  border ">
        <h2>Reviews (2 Reviews)</h2>

        <br />

        <div className="d-flex justify-content-between flex-wrap " style={{maxWidth : '330px'}}>
            {starsReviews.map((val,ind)=>(
                <p style={{cursor : 'pointer'}} className={tourRate == (ind+1) ? "activeRate" : ''} onClick={()=>{setTourRate(ind+1)}} key={ind}>{(ind+1)} {val.name}</p>
            ))}
        </div>


        <form className="rounded-pill overflow-hidden  comment_form"  onSubmit={submitCommentHundle} style={{padding : '3px'}}>
            <div className="d-flex  py-3 rounded-pill px-3">
                <textarea type="text" maxLength={200} className="w-100 fs-5 textAreaC" onChange={(e)=>{setCommentInp(e.target.value)}} placeholder="Share your thoghts"/>
                <button className="btn bg rounded-pill text-white" >Submit</button>
            </div>
        </form>


        <div className="mt-4 w-100 px-5" style={comments.length > 3 ?{maxHeight : '500px' ,overflowY : "scroll"} : {maxHeight : '100%' ,overflow : "visible"}}>
            {comments.map((val,ind)=>(
                <div key={ind} className="d-flex align-items-center py-3 my-3 gap-3">
                  <img src={val.profileImg} alt="profileImg" className="flex1 rounded-circle overflow-hidden border position-relative" style={{maxWidth : '70px',top : '-30px'}} />
                <div className="flex2">
                    <p><strong>{val.name}</strong></p>
                    <p className="w-100 d-flex justify-content-between mb-4"><span className="home-text">{val.time}</span> <span><i className="mainTextColor fa-solid fa-star"></i> {val.rate}</span></p>
                <h5>{val.desc}</h5>
                </div>  
                </div>
            ))}
        </div>

    </div>
  )
}

export default Comments