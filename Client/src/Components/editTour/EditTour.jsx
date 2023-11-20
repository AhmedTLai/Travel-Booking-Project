import { useNavigate, useParams } from 'react-router-dom'
import './EditTour.css'
import { useEffect, useState } from 'react'
import api from '../../assets/data/api_Url_Config'

const EditTour = () => {
    const [FromImg,setFormImg] = useState()
    const [photo ,setPhoto] = useState('')
    const [input , setInput] = useState()
    const navigate = useNavigate()
    const {id} = useParams()
    const [cards,setCards] = useState()


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
    
        const data = cards?.find(val=> val.tour_id == id)

    // const [inpPhoto , setInpPhoto] = useState()
    const FileHundler = (e)=>{
        const file = e.target.files[0];
         // Get the first selected file
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
    
    
    const FormHundler = async (e) => {
      try {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('image', FromImg);
        formData.append('inp',JSON.stringify(input))
        // console.log(formData)
        // await api.post('/tour/uploadImg', formData);
    
        await api.put('/tour/edit-tour/' + id,formData);
        
        navigate('/tours');
      } catch (error) {
        console.error("Form submission error:", error);
      }
    };

      return (
        <div className="container py-5 my-5">
            <br />
            <br />
            <h1>Edit Tour info</h1>
            <br />
            <br />
            <form className="AddTourForm" onSubmit={FormHundler}>
    
            <input  type="text" name="title" className="form-control border py-3 px-3 btn " placeholder={'prev Title : ' + data?.title} onChange={inputHundler}/>
            <br />
            <br />
            <input type="text" name="city" className="form-control border py-3 px-3 btn" placeholder={'prev City Name : ' + data?.city} onChange={inputHundler}/>
            <br />
            <br />
            <input type="number" min={0} name="price" className="form-control border py-3 px-3 btn" placeholder={'prev price : ' + data?.price} onChange={inputHundler}/>
            <br />
            <br />
            <input type="number" min={0} name="distance" className="form-control border py-3 px-3 btn" placeholder={'prev distance : ' + data?.distance} onChange={inputHundler} />
            <br />
            <br />
            <input type="number" name="maxGroupSize" className="form-control border py-3 px-3 btn" placeholder={'prev groupSize number : ' + data?.maxGroupSize} onChange={inputHundler}/>
            <br />
            <br />
            <textarea name="desc" className="form-control border py-3 px-3 btn" placeholder={'prev desc: ' + data?.desc} onChange={inputHundler}/>
            <br />
            <br />
            <div className='d-flex gap-3'>
                <div className='flex1 position-relative'>
            <input type="file" name="photo" className="form-control border py-3 px-3 position-absolute" style={{opacity : '0', pointerEvents : 'none',top : '-50px', left : '-1000px'}} id="photo" onChange={FileHundler}/>
            <label htmlFor="photo" className="btn bg text-white pointer-cursor">Change photo</label>
            <p className='py-1'>{FromImg && FromImg.name ? FromImg.name : 'No file selected'}</p>
            </div>
            
            <div className='flex1'>
{               
 photo ? 
 <img src={photo} alt="UploadedImage"  className='w-100 h-100' style={{maxWidth : '300px',maxHeight : '300px' , objectFit : 'contain'}}/>
 :
 <img src={`/upload/${data?.photo}`} alt="UploadedImage"  className='w-100 h-100' style={{maxWidth : '300px',maxHeight : '300px' , objectFit : 'contain'}}/>
}            </div>
            </div>
            <br />
            <br />
            <button className="btn bg text-white w-100 py-3 fs-3 d-flex justify-content-center pointer-cursor">Save Changes</button>    
            
             </form>
    
        </div>
      )
    }


export default EditTour