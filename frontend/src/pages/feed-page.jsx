import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";

const FeedPage = () =>{
    const {user} = useAuth0()
// const [opponents, setOppents] = useState([])

// useEffect(() => {
//     const fetchAllOpponents =  async ()=> {
//         try{
//             const res = await axios.get("http://localhost:8880/opponents")
//             console.log(res)
//         }catch(err){
//             console.log(err)
//         }
//     }
//     fetchAllOpponents( )
// },[])


    return(
        <h1>{user.name}</h1>
        
    )
    
    }
    
    export default withAuthenticationRequired(FeedPage, {
        onRedirecting: () => <Loading />,
      });