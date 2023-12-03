import './login.css'
import {Link , useNavigate} from 'react-router-dom'
import api from '../../assets/data/api_Url_Config.js'
import { useState } from 'react'


const Register = () => {
const navigate = useNavigate()
const [Loading , setLoading] = useState(false)
const [input , setInput] = useState()
const [err , setErr] = useState()
const inpHundler = (e)=>{
  setInput(prev => ({...prev , [e.target.name] : e.target.value}))
}

const RegisterHundler = async (e)=>{
  e.preventDefault()
  setLoading(true)
try{
  await api.post('/user/register',input)
  .then((res) => 
  {
    setErr(res)
    navigate('/')
  })
  .catch(err => setErr(err.response.data))
  setLoading(false)
}catch(err){
  setLoading(false)
  console.log(err)
}
  
}
// navigate('/login')

  return (
    <div className="container my-5  py-5">
        <div className="d-flex gap-3 my-5">
        <aside className="flex1">
            <img src="/images/register_batcheditor_fotor.webp" alt="RegisterPic" className="w-100"/>
        </aside>

        <form className="py-3 bg position-relative text-white flex1 px-3 form" onSubmit={RegisterHundler}>

        <div className="avatar w-100 h-100  rounded-circle overflow-hidden border py-3 px-3 position-absolute bg-white">
            <i className="fa-regular fa-user w-100 h-100 fs-1 d-flex align-items-center justify-content-center" ></i>
        </div>

        <br />
        <br />
        <h1 className='text-center text-white'>Register</h1>
        <br />
        <input type="text" name='fullname' placeholder='Enter you fullname ...' className='form-control' required onChange={inpHundler}/>
        <br />
        <input type="email" name='email' placeholder='Enter you email ...' className='form-control' required onChange={inpHundler}/>
        <br />
        <input type="password" name='password' placeholder='Enter you Password ...' className='form-control' required onChange={inpHundler}/>
        <br />
        <p className='py-3 text-danger text-center'>
  {err?.status == 200 ? (
    <>{err.data} . go to  <Link to='/login' className='text-dark border-bottom pb-1'>Login</Link> Page</>
  ) : (
    err?.data
  )}
</p>
<button className='btn text-light d-flex align-items-center' style={{background : '#77362f' , minHeight : '60px'}}>{Loading ? <img style={{maxHeight : '40px'}} className='h-100' src='/images/Loading.svg'/> : "Register"}</button>
        <br />
        <br />
        <p  className='text-white d-flex  gap-1 justify-content-center'>Already have account ? <Link className='text-dark' to='/login'>Login</Link></p>
        </form>

        </div>
    </div>
  )
}

export default Register