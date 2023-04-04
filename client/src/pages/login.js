import React , {useState , useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { Link , useNavigate } from 'react-router-dom'
import { login } from '../redux/action/authAction'
const Login = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {auth} = useSelector((state)=>state)

  const [show , setShow] = useState(true)

  const initialState = {email:"" , password:""} 

  const [userData , setUserData] = useState(initialState)

  const {email , password} = userData

  const handleChangeInput = (e)=>{
    const {name , value} = e.target
    setUserData({...userData , [name]:value})
  }

  useEffect(()=>{
    if(auth.token) {
      navigate('/')
    }
  },[navigate , auth.token])

  const handleSubmit = (e)=>{
    e.preventDefault()
    
    dispatch(login(userData))
    navigate('/')
  }

  return (
    <div className='loginForm'>
     <form onSubmit={handleSubmit}>
      <h3 className='text-uppercase text-center mb-4'>minigram</h3>
  <div class="form-group">
    <label for="exampleInputEmail1">ایمیل</label>
    <input type="email" class="form-control" value={email} id="exampleInputEmail1" name='email' aria-describedby="emailHelp" onChange={handleChangeInput} />
   
  </div>
  <div class="form-group position-relative">
    <label for="exampleInputPassword1">رمز عبور</label>
    <input type={show ? 'password' : 'text'} value={password} class="form-control" name='password' id="exampleInputPassword1" onChange={handleChangeInput} />
    <small className='position-absolute ' style={{bottom:'10px' ,left:'15px' , cursor:'pointer'}} onClick={()=>setShow(!show)}>{show ? 'نمایش' : 'مخفی'}</small>
  </div>
  <button type="submit" class="btn btn-dark w-100">Submit</button>
  <p >
    شما اکانت شخصی ندارید؟ <Link to={'/register'} style={{color:'crimson'}}>ساخت اکانت</Link>
  </p>
</form>
    </div>
  )
}

export default Login
