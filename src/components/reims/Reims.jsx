import Reim from "../reim/Reim";
import "./reims.scss"
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Reims = () => {

    const {currentUser} = useContext(AuthContext);
    
    const { isLoading, error, data } = useQuery(["posts"], () =>
        makeRequest.get("reims/find/" + currentUser.id).then((res)=>{
            return res.data;
        })

    );

    return (
        <div className="posts">
            {error ? "Something went wrong!" 
            : isLoading
            ? "loading"
            :  data.map((post)=>
                <Reim post={post} key={post.id} />)}
        </div>
    )
}

export default Reims