import {useState,useEffect} from 'react'
export const API_ENDPOINT = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
const useFetch = (urlParams) => {
    const [isLoading,setIsLoading] = useState(true)
    const [error,setError] = useState({show:false,msg:''})
    const [data,setData] = useState([])
    

    const fetchMovies =async (url) => {
        setIsLoading(true)
        try {
            const response = await fetch(url) 
            const data = await response.json()
            console.log(data)
    
       if(data.Response === 'True'){
           setData(data.Search || data)
           setError({show:false,msg:''})
       } 
       else{
           setError({show:true,msg:data.Error})
       } 
       setIsLoading(false)   
        }catch(error){
            console.log(error)
        }
    }
    
        useEffect(() => {
            fetchMovies(`${API_ENDPOINT}&s=${urlParams}`)
        },[urlParams])
  return {isLoading,error,data}
}

export default useFetch