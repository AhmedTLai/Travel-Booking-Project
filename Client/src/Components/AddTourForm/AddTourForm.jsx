import { useState } from 'react'
import './AddTourForm.css'
import api from '../../assets/data/api_Url_Config'
import { useNavigate } from 'react-router-dom'


const AddTourForm = () => {

  

const [FromImg,setFormImg] = useState()
const [photo ,setPhoto] = useState('')
const [input , setInput] = useState()
const navigate = useNavigate()

// const [inpPhoto , setInpPhoto] = useState()
const FileHundler = (e)=>{
    const file = e.target.files[0]; // Get the first selected file
    setFormImg(file)
    if (file) {
      var imageUrl = URL.createObjectURL(file); // Create a URL for the file
      setPhoto(imageUrl); // Set the URL as the image source
    }
    // setInpPhoto(file.name)
}




const inputHundler = (e)=>{
    setInput(prev =>({...prev,[e.target.name] : e.target.value}))
    
}


const FormHundler = async (e)=>{
    e.preventDefault()
    // await api.post('/add-tour',{photo : inpPhoto})
   
    const formData = new FormData();
    formData.append('image', FromImg);

  await api.post('/tour/uploadImg',formData)

    await api.post('/tour/add-tour',input)
        .then(res => navigate('/tours'))
        .catch(err => console.log(err))

    
    
    
}
  return (
    <div className="container py-5 my-5">
        <br />
        <br />
        <h1>Add Tour info</h1>
        <br />
        <br />
        <form className="AddTourForm" onSubmit={FormHundler}>

        <input required type="text" name="title" className="form-control border py-3 px-3 btn " placeholder="title" onChange={inputHundler}/>
        <br />
        <br />
        <input required type="text" name="city" className="form-control border py-3 px-3 btn" placeholder="city" onChange={inputHundler}/>
        <br />
        <br />
        <input required type="number" min={0} name="price" className="form-control border py-3 px-3 btn" placeholder="price" onChange={inputHundler}/>
        <br />
        <br />
        <input required type="number" min={0} name="distance" className="form-control border py-3 px-3 btn" placeholder="distance" onChange={inputHundler} />
        <br />
        <br />
        <input required type="number" name="maxGroupSize" className="form-control border py-3 px-3 btn" placeholder="maxGroupSize" onChange={inputHundler}/>
        <br />
        <br />
        <textarea required name="desc" className="form-control border py-3 px-3 btn" placeholder="desc" onChange={inputHundler}/>
        <br />
        <br />
        <div className='d-flex gap-3'>
            <div className='flex1 position-relative'>
        <input type="file" name="photo" className="form-control border py-3 px-3 position-absolute" style={{opacity : '0', pointerEvents : 'none',top : '-50px', left : '-1000px'}} id="photo" onChange={FileHundler} required/>
        <label htmlFor="photo" className="btn bg text-white pointer-cursor">Add photo</label>
        <p className='py-1'>{FromImg && FromImg.name ? FromImg.name : 'No file selected'}</p>
        </div>
        {photo && 
        <div className='flex1'>
            <img src={photo} alt="UploadedImage"  className='w-100 h-100' style={{maxWidth : '300px',maxHeight : '300px' , objectFit : 'contain'}}/>
        </div>}
        </div>
        <br />
        <br />
        <button className="btn bg text-white w-100 py-3 fs-3 d-flex justify-content-center pointer-cursor">Publish tour</button>    
        
         </form>

    </div>
  )
}

export default AddTourForm