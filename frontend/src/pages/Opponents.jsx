import { useState, useEffect } from "react"
import axios from "axios"

const Opponents = () =>{
const [opponents, setOppents] = useState([])

useEffect(() => {
    const fetchAllOpponents =  async ()=> {
        try{
            const res = await axios.get("http://localhost:8880/opponents")
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    fetchAllOpponents( )
},[])


    return(
        <div>Opponents</div>
    )
    
    }
    
    export default Opponents