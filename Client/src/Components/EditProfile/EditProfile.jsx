import { useContext, useState } from 'react'
import './EditProfile.css'
import {AuthContext} from '../../Context/AuthContext'
import api from '../../assets/data/api_Url_Config'
import { useNavigate } from 'react-router-dom'
import { AdvancedImage } from '@cloudinary/react'
import {Cloudinary} from "@cloudinary/url-gen";



const EditProfile = () => {

    const {currentUser , EditUpdate} = useContext(AuthContext)
    const id = currentUser?.user_id
    const [inp,setInp] = useState()
    const [photo,setPhoto] = useState() 
    const [formPhoto,setFormPhoto] = useState()

    const navigate = useNavigate()

    const inputHundler = (e)=>{
      setInp(prev => ({...prev,[e.target.name] : e.target.value}))
    }

    const fileHundler = (e)=>{
      const file = e.target.files[0]

      setPhoto(file)
      
      if(file){
        var imageUrl = URL.createObjectURL(file); // Create a URL for the file
        setFormPhoto(imageUrl)
      }

    }


  const SubmitHundler = async (e)=>{
    e.preventDefault()

    const formdata = new FormData()
    formdata.append('inp',JSON.stringify(inp))
    formdata.append('profileImg',photo)

    try{
      const editapi = await api.put('/userconf/editProfile/'+id,formdata)
      // console.log(editapi.data)
      if(editapi){
      // localStorage.setItem('Auth_token', JSON.stringify(editapi.data));
      EditUpdate(editapi.data[0])
      
        navigate('/')
      }
    }catch(err){
      console.log(err)
    }
  }

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dwkxpjgor'
    }
  }); 

  const pic = currentUser?.profile_pic+'.jpg'
  const myImage = cld.image(pic,{ responsive_breakpoints: { 
    transformation: { crop: 'cover', aspect_ratio: '16:9', gravity: 'auto' } 
  }}).setVersion('1701267061');

  return (
    <div className='container my-4'>
        {currentUser?.admin &&
        <div className='bg position-fixed text-white d-flex align-items-center justify-content-center py-3 px-2' style={{zIndex : '6', cursor : 'default',minHeight : '70px' ,maxWidth : '100px',top : '150px',left : '30px'}}>
            <h4>Admin</h4>
        </div>}
        <div className=' my-3 d-inline-flex flex-column align-items-center justify-content-center w-100'>
{ currentUser?.profile_pic == '/images/avatar.jpg' ?            
<img src={currentUser?.profile_pic} alt="avatar" className='border my-4 rounded-circle overflow-hidden w-100 h-100' style={{maxWidth : '100px',minHeight : '100px' , objectFit : 'cover'}}/>
:
<AdvancedImage cldImg={myImage} className='border my-4 rounded-circle overflow-hidden w-100 h-100' style={{maxWidth : '100px',minHeight : '100px' , objectFit : 'cover'}}/>
}
            {formPhoto && 
        <div className='flex1 mb-5  rounded-circle overflow-hidden'>
            <img src={formPhoto} alt="UploadedImage"  className='w-100 h-100' style={{maxWidth : '150px',minHeight : '150px',objectFit : 'cover'}}/>
        </div>}
            {/* <Image
            publicId='1701101451438-book1.PNG'
            /> */}
            {/* <CloudinaryContext cloudName="dwkxpjgor">
            <Image
            publicId='v1701261911/1701261878075-brahim-abderrahman-jGlnjl6fHhQ-unsplash.jpg.jpg'
            />
            </CloudinaryContext> */}
            {/* <img src="https://res.cloudinary.com/dwkxpjgor/image/upload/v1701101453/1701101451438-book1.PNG.png" alt="pci" /> */}
            <label htmlFor='profilepic' className='btn text-white bg'>Change pic</label>
            <input type="file" name='profile_pic' id='profilepic' className='d-none' onChange={fileHundler}/>
        </div>
        <form className='mx-5 editProfile gap-3' onSubmit={SubmitHundler}>
            
        <input type="email" onChange={inputHundler} name="email" id="email" className='form-control btn text-start py-3 px-2 my-2 border' placeholder='prev Email :'/>
        <br />
        <br />
        <input type="text" onChange={inputHundler} name="fullname" id="fullname" className='form-control btn  text-start py-3 px-2 my-2 border' placeholder='prev fullname :'/>
        <br />
        <br />
        <input type="password" onChange={inputHundler} name="password" id="password" className='form-control btn text-start py-3 px-2 my-2 border ' placeholder='prev password :'/>
        <br />
        <br />
       
        <button className='btn text-white bg w-100 py-3 fs-5'>Save</button>
        </form>
        <br />
        <br />
        <div className='d-flex justify-content-center w-100'>
        <button className='btn bg-danger text-white text-center'>Remove my account</button>
        </div>
    </div>
  )
}

export default EditProfile