import React , {useState} from 'react'
import Carousel from '../../Carousel'
const CardBody = ({post}) => {
  const [readMore , setReadMore] = useState(false)

  const handleReadMore = ()=>{
    setReadMore(!readMore)
  }

  return (
    <div className='cardBody'>
      <div className='cardBodyContent'>

        <span>
          {
            post.content.length < 60 ? post.content : readMore ? post.content + '' : post.content.slice(0,60)+'.....'
          }
        </span>
        {
          post.content.length > 60 && <span onClick={handleReadMore}>
          {
            readMore ? 'Hide content' : 'Read more' 
          }
        </span>
        }

      </div>
          <Carousel post={post}/>
    </div>
  )
}

export default CardBody
