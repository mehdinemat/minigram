import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import Info from '../../components/profile/Info'
import { getProfileUser } from '../../redux/action/profileAction'
import Posts from '../../components/profile/Posts'
const Profile = () => {

  const {profile , auth } = useSelector((state)=>state)
  const [savePost , setSavePost] = useState(true)
  const dispatch = useDispatch()

  const {id} = useParams()

  useEffect(()=>{
    if(profile.ids.every((item)=> item !== id))
    {
      
      console.log(profile , id , auth)
      dispatch(getProfileUser({id , auth}))
    }

  },[ id , profile.ids])




  return (
   profile.loading ? 
   <div className='d-flex flex-row justify-content-center align-item-center my-5'><div class="spinner-border m-5" role="status">
   <span class="sr-only">Loading...</span>
  </div></div>
   :
    auth.user && <div className='ProfBase'>
      <Info auth={auth} profile={profile}  id={id}/>
      {auth.user._id === id && <div className='savePostOptions'> 
         { <span onClick={()=>setSavePost(true)} className={savePost && 'active'}>Posts</span>}
          <span onClick={()=>setSavePost(false)} className={!savePost && 'active'}>Saved</span>
         </div>}
    { auth.user &&  <Posts id={id} auth={auth} isSaved={savePost} savedPost={auth.user.saved} profile={profile}/>}
    </div> 
  )
}

export default Profile
