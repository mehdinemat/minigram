
    export const GLOBALTYPES = {

        AUTH:"AUTH",
        ALERT:"ALERT",
        THEME:'THEME',
        FOLLOW:'FOLLOW',
        FOLLOWER : 'FOLLOWER',
        STATUS:'STATUS',
        SOCKET:'SOCKET',
        PEER:'PEER',
        CALL:'CALL'

    }
    export const EditData= ({post , newPost})=>{
      const newData =  post.map((item)=> (item._id === newPost._id ? newPost : item))
      return newData
    }
    export const deleteData  =({posts , deletePost})=>{

      console.log(posts, deletePost)
     const newPost = posts.filter((item)=>(
        item._id !== deletePost._id
      ))
      return newPost

    }