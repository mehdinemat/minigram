import axios from 'axios'
export const checkImage = (Image)=>{
  var err = ""
  if(!Image){ return err="File does not exist."}

  if(Image.size > 1024*1024){
    return err="The largest image size is 1mb"
  }

  if(Image.type !== 'image/jpeg' && Image.type !== 'image/png'){return err="Image format is incorrect"}

  return err

}
export const imageUpload =async (avatar)=>{
  console.log(avatar)
  const newArr = []
  for( const item of avatar)
  {
    const formData = new FormData()
  if(item.camera){
    formData.append('file' , item.camera)
  }else {
    formData.append('file' , item)

  }
    formData.append('upload_preset' ,'nsavba7s')
    formData.append('cloud_name' , "dot5q67eh")
    
    await axios.post('https://api.cloudinary.com/v1_1/dot5q67eh/upload' , formData ).then((response)=>{
      newArr.push(response.data.secure_url)
      console.log(response.data.secure_url)
    })
  }
  return newArr

}