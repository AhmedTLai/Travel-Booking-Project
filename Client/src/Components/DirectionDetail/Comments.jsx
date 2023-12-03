import { useContext, useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext'
import api from "../../assets/data/api_Url_Config"
import { AdvancedImage } from "@cloudinary/react"
import {Cloudinary} from "@cloudinary/url-gen";
const starsReviews = [
    {name : <i className="fa-solid fa-star mainTextColor"></i>},
    {name : <i className="fa-solid fa-star mainTextColor"></i>},
    {name : <i className="fa-solid fa-star mainTextColor"></i>},
    {name : <i className="fa-solid fa-star mainTextColor"></i>},
    {name : <i className="fa-solid fa-star mainTextColor"></i>},
]

// const comments = [
//     {
//         name : 'profileName',
//         profileImg : '/images/avatar.jpg',
//         rate : 4.5,
//         desc : 'here description area',
//         time : 'October 01,2023'
//     },
//     {
//         name : 'profileName',
//         profileImg : '/images/avatar.jpg',
//         rate : 3.5,
//         desc : 'here description area',
//         time : 'October 01,2023'
//     },
//     {
//         name : 'profileName',
//         profileImg : '/images/avatar.jpg',
//         rate : 5.0,
//         desc : 'here description area',
//         time : 'October 01,2023'
//     }
//     ,
//     {
//         name : 'profileName',
//         profileImg : '/images/avatar.jpg',
//         rate : 5.0,
//         desc : 'here description area',
//         time : 'October 01,2023'
//     }
// ] 



const Comments = () => {
    const {currentUser} = useContext(AuthContext)
    const [commentInp,setCommentInp] = useState('')
    const [tourRate,setTourRate] = useState(0)
    const params = useParams()
    const [loading , setLoading] = useState(false)
    const [err ,setErr] = useState('')
    const [comments,setComments] = useState([])

    const tour_id = params?.id
    const user_id = currentUser?.user_id
    const data = {user_id ,tour_id ,desc:commentInp ,rate:tourRate}

    const submitCommentHundle = async (e)=>{
        e.preventDefault()
        // alert('Rate : '+tourRate + '\nComment : ' + commentInp)
        try{

            if(commentInp && tourRate != 0){
                setLoading(true)
             await api.post('/tour/reviews',data)
            setCommentInp('')
            setTourRate(0)
            setLoading(false)
            setErr('')
            }
            else{
                setErr('you must enter a review before you submit')
            }
        }catch(err){
            setCommentInp('')
            setTourRate(0)
            setLoading(false)
            console.log(err)
            setErr('something went wrong please try again later')
        }
        
    }

    useEffect(()=>{
        const abort = new AbortController()
        try{
            api.get('/tour/getReviews/'+tour_id , {signal : abort.signal})
            .then(res=>setComments(res.data))
        }catch(err){
            console.log(err)
        }

        return()=>{
            abort.abort
        }
    },[commentInp,tourRate,tour_id])


    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dwkxpjgor'
        }
      }); 
    // currentUser?.profile_pic+'.jpg'
    const getProfilePicUrl = (element) => {
        const pics = element.profile_pic + '.jpg';
        return pics
      };
    
      const picUrls = comments.map(getProfilePicUrl);
    
      const myImage = picUrls.map((pic) => {
        return cld.image(pic, {
          responsive_breakpoints: {
            transformation: { crop: 'cover', aspect_ratio: '16:9', gravity: 'auto' },
          },
        }).setVersion('1701267061');
      });

  return (
    <div className="container py-3 mt-4  border ">
        <h2>Reviews ({comments?.length} Reviews)</h2>

        <br />
        <p className="w-100 text-danger">{err && err}</p>
        <br />
        <div className="d-flex justify-content-between flex-wrap " style={{maxWidth : '330px'}}>
            {starsReviews.map((val,ind)=>(
                <p style={{cursor : 'pointer'}} className={tourRate == (ind+1) ? "activeRate" : ''} onClick={()=>{setTourRate(ind+1)}} key={ind}>{(ind+1)} {val.name}</p>
            ))}
        </div>


        <form className="rounded-pill overflow-hidden  comment_form"  onSubmit={submitCommentHundle} style={{padding : '3px'}}>
            <div className="d-flex  py-3 rounded-pill px-3">
                <textarea value={commentInp} type="text" maxLength={200} className="w-100 fs-5 textAreaC" onChange={(e)=>{setCommentInp(e.target.value)}} placeholder="Share your thoghts"/>
                <button className="btn bg rounded-pill text-white" >{loading ? <img style={{maxHeight : '40px'}} className='h-100' src='/images/Loading.svg'/> : "Submit"}</button>
            </div>
        </form>

        
        <div className="mt-4 w-100 px-1" style={comments.length > 3 ?{maxHeight : '500px' ,overflowY : "scroll"} : {maxHeight : '100%' ,overflow : "visible"}}>
            
            {comments.map((val,ind)=>(
                <div key={ind} className="d-flex align-items-center py-3 my-3 gap-3 border px-3">
                  {val.admin ? <div className="adminDiv bg text-white py-1 px-1"><h5>ADMIN</h5></div> : ''}
                  { val?.profile_pic == '/images/avatar.jpg' ?            
<img src={val?.profile_pic} alt="avatar" className='border my-4 rounded-circle overflow-hidden w-100 h-100 position-relative' style={{maxWidth : '70px', minWidth : '70px',minHeight : '70px' ,maxHeight : '70px' , objectFit : 'cover',top : '-30px'}}/>
:
    <AdvancedImage key={ind} cldImg={myImage[ind]} className='border my-4 rounded-circle overflow-hidden w-100 h-100 position-relative' style={{maxWidth : '70px', minWidth : '70px',minHeight : '70px' ,maxHeight : '70px', objectFit : 'cover',top : '-30px'}}/>
}
                <div className="flex2">
                    <h3><strong>{val.fullname}</strong></h3>
                    <p className="w-100 d-flex justify-content-between mb-4 "><span className="home-text">{val.time}</span> <span><i className="mainTextColor fa-solid fa-star"></i> {val.rate}</span></p>
                <h5 className="ms-3">{val.desc}</h5>
                </div>  
                </div>
            ))}
        </div>

    </div>
  )
}

export default Comments