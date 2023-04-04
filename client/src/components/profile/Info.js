import React , {useEffect , useState} from 'react'
import { useSelector ,  useDispatch} from 'react-redux'
import Avatar from '../Avatar'
import FollowBtn from '../FollowBtn'
import EditProfile from './EditProfile'
import Following from './Following'
import Followers from './Followers'
const Info = ({auth , profile , id}) => {

  const [showFollowers , setShowFollowers] = useState(false)
  const [showFollowing , setShowFollowing] = useState(false)

  const [onEdit , setOnEdit] = useState(false)
   
    const [user , setUser] = useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
      setShowFollowers(false)
      setShowFollowing(false)
        if(auth.user && auth.user._id === id){
            setUser([auth.user])
        }else {
          const newData = profile.users.filter((item)=> item._id === id)

          setUser(newData)
        }

    },[auth.user , id , profile  , dispatch])


  return (
    <div className='info'>

           {user.map((item)=>(
            <div className='info_content'>
              <Avatar src={item.avatar}/>


                <div className='info_content_title'>
                  <div className='info_content_follow'>
                  <h2>{item.username}</h2>
                    { id === auth.user._id ? <button onClick={()=>setOnEdit(true)}>Edit Profile</button> : <FollowBtn  user={item}/> }
                  </div>
                  <div className='info_user'>
                    <div className='number_follow_item'>
                        <span onClick={()=>setShowFollowers(true)} style={{cursor:'pointer'}}> {item.followers.length} followers</span>
                        <span onClick={()=>setShowFollowing(true)} style={{cursor:'pointer'}}> {item.following.length} following </span>
                    </div>
                  <h4>{item.fullname}  <small>{item.mobile}</small></h4>  
                  <p>{item.address}</p>
                  <h6>{item.email}</h6>
                  <a href={item.website} target="_blank">{item.website}</a>
                  <br/>
                  <small>{item.story}</small>
                 </div>
                    {onEdit && <EditProfile setOnEdit={setOnEdit}/>}

                    {
                      showFollowers && <Followers setShowFollowers={setShowFollowers} users={user[0].followers} auth={auth}/>
                    }
                    {
                      showFollowing && <Following setShowFollowing={setShowFollowing} users={user[0].following} auth={auth}/>
                    }

                </div>


            </div>
           ))}
    </div>
  )
}

export default Info
