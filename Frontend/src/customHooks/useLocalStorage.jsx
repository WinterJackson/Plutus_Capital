import { useEffect, useState } from "react"

const getFromLocalStorage=(key,initialV)=>{

    const storedValue=JSON.parse(localStorage.getItem(key))

    if (storedValue) return storedValue

    else if (initialV instanceof Function) return initialV()

    return initialV
}

const useLocalStorage = (key,initialValue) => {
    const [random, setRandom] = useState(()=>getFromLocalStorage(key,initialValue))

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(random))
        
    },[key,random])


    // localStorage.clear()
    
    
    

    return [random, setRandom]
}

export default useLocalStorage