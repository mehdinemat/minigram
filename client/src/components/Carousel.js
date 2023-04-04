import React from 'react'

const Carousel = ({post}) => {
  const isActive = e=>{
    if(e === 0){return 'active'}
  }
  return (
    <div class='cardBodyCarousel'>
     
     <div id={`image${post._id}`} class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    {
      post.images.map((item,index)=>
      <li key={index} data-target={`#image${post._id}`} data-slide-to={index} class={isActive(index)}></li>
      )
    }
  </ol>
  <div class="carousel-inner" >
      {
        post.images.map((item , index)=>
    <div class={`carousel-item ${isActive(index)}`} key={index}  data-interval="100000">
      
    { item.match(/video/i) ? <video controls class="d-block w-100 carouselImg" src={item} alt={index} style={{zIndex:999}}/>:<img class="d-block w-100 carouselImg" src={item} alt={index} />  }
    </div>
        )
      }
  
  </div>
  <a  class={`carousel-control-prev ${post.images.length < 2 ? 'displayNone' :''}`} href={`#image${post._id}`} role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class={`carousel-control-next ${post.images.length < 2 ? 'displayNone' :''}`} href={`#image${post._id}`} role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
    </div>
  )
}

export default Carousel
