import { useContext } from 'react'
import './EditProfile.css'
import {AuthContext} from '../../Context/AuthContext'
const EditProfile = () => {

    const {currentUser} = useContext(AuthContext)
console.log(currentUser)
  return (
    <div className='container my-4'>
        {currentUser?.admin &&
        <div className='bg position-fixed text-white d-flex align-items-center justify-content-center py-3 px-2' style={{zIndex : '6', cursor : 'default',minHeight : '70px' ,maxWidth : '100px',top : '150px',left : '30px'}}>
            <h4>Admin</h4>
        </div>}
        <div className=' my-3 d-inline-flex flex-column align-items-center justify-content-center w-100'>
            <img src={currentUser?.profile_pic == 'Default.png' ? "/images/avatar.jpg" : '/upload/userImages'+currentUser.profile_pic} alt="avatar" className='border my-4 rounded-circle overflow-hidden w-100 h-100' style={{maxWidth : '100px',minHeight : '100px' , objectFit : 'cover'}}/>
            <label htmlFor='profilepic' className='btn text-white bg'>Change pic</label>
            <input type="file" name='profile_pic' id='profilepic' className='d-none'/>
        </div>
        <form className='mx-5 editProfile gap-3'>
            
        <input type="email" name="email" id="" className='form-control btn text-start py-3 px-2 my-2 border' placeholder='prev Email :'/>
        <br />
        <br />
        <input type="text" name="fullname" id="" className='form-control btn  text-start py-3 px-2 my-2 border' placeholder='prev fullname :'/>
        <br />
        <br />
        <input type="password" name="password" id="" className='form-control btn text-start py-3 px-2 my-2 border ' placeholder='prev password :'/>
        <br />
        <br />
        <input type="text" name="old" id="" className='form-control btn text-start py-3 px-2 my-2 border' placeholder='prev old :'/>
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