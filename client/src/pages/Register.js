import React , {useState , useEffect} from 'react'
import { Link  , useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { register } from '../redux/action/authAction'
import { useDispatch } from 'react-redux'
const Register = () => {
  
  const {auth} = useSelector((state)=>state)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(()=>{
    if(auth.token){navigate('/')}
  },[auth.token])

  const initialState = {
    fullname:"",
    username:"",
    email:"",
    password:"",
    confirmpassword:"",
    gender:""
  }

  const [dataUser , setDataUser] = useState(initialState)

  const {fullname, username , email , password , confirmpassword , gender} = dataUser

  const handleChangeInput =(e)=>{
    const {name , value} = e.target
    setDataUser({...dataUser , [name]:value})

  }
  const submitRegisterForm = (e)=>{
    e.preventDefault()
    dispatch(register(dataUser))
    console.log('this is register')
  }

  const [show , setShow] = useState(true)
  const {alert} = useSelector((state)=>state)
  return (
    <div className='loginForm'>
     <form onSubmit={submitRegisterForm}>
      <h3 className='text-uppercase text-center mb-4'>minigram</h3>
  <div class="form-group">
    <label for="exampleInputEmail1">نام کامل</label>
    <input     style={{background: `${alert.fullname ? '#fd2d6a14' : ''}`}} 
      type="text" class="form-control" value={fullname}  id="exampleInputEmail1" name='fullname' aria-describedby="emailHelp" onChange={handleChangeInput}  />
    <small className='text-danger form-text'>{alert.fullname ? alert.fullname : ''}</small>
  </div>


  <div class="form-group position-relative">
    <label for="exampleInputPassword1">نام کاربری</label>
    <input style={{background: `${alert.username ? '#fd2d6a14' : ''}`}}  type='text' class="form-control" name='username' value={username} id="exampleInputPassword1" onChange={handleChangeInput}  />
    <small className='text-danger form-text'>{ alert.username ? alert.username :'' }</small>
  </div>
  
  <div class="form-group position-relative">
    <label for="exampleInputPassword1">ایمیل</label>
    <input style={{background: `${alert.email ? '#fd2d6a14' : ''}`}}  type='text' class="form-control" name='email' value={email} id="exampleInputPassword1" onChange={handleChangeInput}  />
    <small className='text-danger form-text'>{ alert.email ? alert.email :'' }</small>
  </div>


  <div class="form-group position-relative">
    <label for="exampleInputPassword1">رمز عبور</label>
    <input style={{background: `${alert.password ? '#fd2d6a14' : ''}`}}  type={show? 'password' :'text'} class="form-control" value={password} name='password' id="exampleInputPassword1" onChange={handleChangeInput} />
    <small className='position-absolute ' style={{bottom:'10px' ,left:'15px' , cursor:'pointer'}} onClick={()=>setShow(!show)}>{show ? 'نمایش' : 'مخفی'}</small>
  </div>
  
  <div class="form-group position-relative">
    <label for="exampleInputPassword1">تکرار رمز عبور</label>
    <input style={{background: `${alert.cf_password ? '#fd2d6a14' : ''}`}}  type={show? 'password' :'text'} class="form-control" value={confirmpassword} name='confirmpassword' id="exampleInputPassword1"  onChange={handleChangeInput}/>
    <small className='position-absolute ' style={{bottom:'10px' ,left:'15px' , cursor:'pointer'}} onClick={()=>setShow(!show)}>{show ? 'نمایش' : 'مخفی'}</small>
  </div>

  <div class="form-group position-relative">
    <label htmlFor='male'>
        مرد : <input type='radio' id='male' name='gender' value='male' defaultChecked onChange={handleChangeInput}/>
      </label> 

    <label htmlFor='female'>
        زن : <input type='radio' id='female' name='gender' value='female'  onChange={handleChangeInput}/>
      </label> 
  </div>



  <button type="submit" class="btn btn-dark w-100">ثبت نام</button>
  <p >
    قبلا اکانت ساخته اید ؟<Link to={'/'} style={{color:'crimson'}}>وارد شوید</Link>
  </p>
</form>
    </div>
  )
}

export default Register
