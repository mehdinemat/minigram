import React from 'react'
import Posts from '../components/home/Posts'
import Status from '../components/home/Status'
import Sidebar from '../components/home/Sidebar'
const Home = () => {
  return (
    <div className='row home'>
      <div className='col-md-7'>
      <Status/>
      <Posts/>
      </div>
      <div className='col-md-5'>
        <Sidebar/>
      </div>
    </div>
  )
}

export default Home
