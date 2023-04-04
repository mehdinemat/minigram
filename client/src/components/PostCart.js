import React from 'react'
import CardBody from './home/post_card/CardBody'
import CardHeader from './home/post_card/CardHeader'
import CardFooter from './home/post_card/CardFooter'
import Comments from './home/Comments'
import InputComment from './home/InputComment'
const PostCart = ({post}) => {
  return (
    <div className='postCard'>
      <CardHeader post={post}/>
      <CardBody post={post}/>
      <CardFooter post={post}/>

      <Comments post={post}/>
      <InputComment post={post}/>
    </div>
  )
}

export default PostCart
