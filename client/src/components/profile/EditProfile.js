import React , {useState} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import {checkImage} from '../../utils/checkImage'
import {GLOBALTYPES} from '../../redux/action/GLOBALTYPES'
import { updateProfileuser } from '../../redux/action/profileAction'
const EditProfile = ({setOnEdit}) => {

  const {auth} = useSelector((state)=>state)
    const initialState = {
        fullname:auth.user.fullname , mobile:auth.user.mobile , address:auth.user.address , website:auth.user.website , story:auth.user.story , gender:auth.user.gender
    }
    const [avatar , setAvatar] = useState(auth.user.avatar)
    const [userData , setUserData] = useState(initialState)
    const {fullname , mobile , address , website , story , gender} = userData

    const dispatch = useDispatch()


    const changeValueInput = (e)=>{
       setUserData({...userData , [e.target.name]:e.target.value})
    }
    const changeAvatar = (e)=>{
      const err = checkImage(e.target.files[0])
      if(err){return dispatch({type:GLOBALTYPES.ALERT , payload:{error:err}})}
        const reader = new FileReader()
        reader.onload=()=>{
          if(reader.readyState === 2)
          setAvatar(reader.result)
        }
        reader.readAsDataURL(e.target.files[0])
   
    }
    const handleSubmit = (e)=>{
      e.preventDefault()
      dispatch(updateProfileuser({userData ,auth ,avatar}))
    }

  return (
    <div className='profEditMain' >
      <div className='form_group'>
      
      <form style={{position:'relative'}} onSubmit={handleSubmit}>
      <button className='btn btn-danger btn_close' onClick={()=>setOnEdit(false)}> 
      Close
      </button>
        <div className='infoAvatar' >

        <img  src={avatar ? avatar :auth.user.avatar }/>
            
            <span >
              <i className='fas fa-camera'></i>
              <input type='file' id='file_up' accept='image/*' name='file' onChange={changeAvatar}/>
            </span>

        </div>
        <div className='form-group formInput'>
          <label>Full name</label>
          <input type='text' className='form-control' value={fullname} name='fullname' onChange={changeValueInput} />
          <small className='formIcon text-danger' value={fullname} >{fullname.length}/25</small>
        </div>
        <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input type="text" name="mobile" value={mobile}
           className="form-control" onChange={changeValueInput} />
        </div>

        <div className="form-group">
           <label htmlFor="address">Address</label>
           <input type="text" name="address" value={address}
           className="form-control" onChange={changeValueInput} />
        </div>

        <div className="form-group">
             <label htmlFor="website">Website</label>
             <input type="text" name="website" value={website}
             className="form-control" onChange={changeValueInput} />
        </div>
        <div className="form-group">
            <label htmlFor="story">Story</label>
            <textarea name="story" value={story} cols="30" rows="4"
            className="form-control" onChange={changeValueInput} />

            <small className="text-danger d-block text-right">
                {story.length}/200
            </small>
        </div>

        <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select name="gender" id="gender" value={gender}
                    className="custom-select text-capitalize"
                    onChange={changeValueInput}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

   <button className="btn btn-info w-100" type="submit">Save</button>
      </form>
      </div>
   
    </div>
  )
}

export default EditProfile
