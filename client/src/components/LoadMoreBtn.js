import React from 'react'
import { getDataAPI } from '../utils/fetchData'
import loading from '../images/loading.gif'
const LoadMoreBtn = ({handleLoadMore , load}) => {
 
  return (
    <div className='d-flex justify-content-center my-2'>
   {  load ? <img src={loading}/> : <button className='btn btn-primary' onClick={handleLoadMore}>LoadMoreBtn</button>}
    </div>
  )
}

export default LoadMoreBtn
