import React,{useState,useEffect}from "react";
import ImgCard from "./components/ImgCard";
import ImageSearch from "./components/ImgSearch";
function App() {
  const [images,setImages] = useState([])
  const [isloading,setIsloading] = useState(true)
  const [term,setTerm] = useState('')
  useEffect(()=>{
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
    .then(res => res.json())
    .then(data=>{
      setImages(data.hits)
      setIsloading(false)
    })
    .catch(err=>{

    })
  },[term])
  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text)=>setTerm(text)}/>
      {!isloading&& images.length == 0 && <h1 className="text-5xl text-center max-auto mt-32">No images found</h1>}
      {isloading ? <h1 className="text-6xl text-center max-auto mt-32">Loading</h1> :<div className="grid grid-cols-3 gap-4">
        {images.map(image=>(
          <ImgCard key={image.id} image={image}/>
        ))}
      </div>}
    </div>
  );
}

export default App;
