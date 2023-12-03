import './login.css'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { useContext, useState } from 'react'


const Login = () => {
  const {Login , err } = useContext(AuthContext)
  const [Loading , setLoading] = useState(false)
  const [input , setInput] = useState(null)

  const navigate = useNavigate()

  const LoginHundler = async (e)=>{
    e.preventDefault()
    try{
      setLoading(true)
      await Login(input) && 
      setLoading(false) 
      navigate('/')
  }catch(err){
    setLoading(false)
    console.log(err)
  }

  }

  const inputHundler = (e)=>{
    setInput(prev => ({...prev , [e.target.name] : e.target.value}))
  }
  return (
    <div className="container my-5  py-5">
        <div className="d-flex gap-3 my-5">
        <aside className="flex1">
            <img src="/images/login_batcheditor_fotor.webp" alt="loginPic" className="w-100"/>
        </aside>

        <form onSubmit={LoginHundler} className="py-3 bg position-relative text-white flex1 px-3 form">

        <div className="avatar w-100 h-100  rounded-circle overflow-hidden border py-3 px-3 position-absolute bg-white">
            <i className="fa-regular fa-user w-100 h-100 fs-1 d-flex align-items-center justify-content-center" ></i>
        </div>

        <br />
        <br />
        <h1 className='text-center text-white'>Login</h1>
        <br />
        <input onChange={inputHundler} type="email" name='email' placeholder='Enter you email ...' className='form-control'/>
        <br />
        <input onChange={inputHundler} type="password" name='password' placeholder='Enter you Password ...' className='form-control'/>
        <br />
        <p className='py-3 w-100 text-danger text-center '>{err?.response.data ? err.response.data : ''}</p>

        <button className='btn text-light  d-flex align-items-center' style={{background : '#77362f' , minHeight : '60px'}}>{Loading ? <img style={{maxHeight : '40px' }} className='h-100' src='/images/Loading.svg'/> : "Login"}</button>
        <br />
        <br />
        <p className='text-white d-flex  gap-1 justify-content-center'>You dont have account ? <Link className='text-dark' to='/register'>Register</Link></p>
        </form>
         
        </div>
    </div>
  )
}

export default Login