import Absen from "../absen/Absen";
import "./absens.scss"
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Absens = () => {

    const {currentUser} = useContext(AuthContext);
    
    const { isLoading, error, data } = useQuery(["posts"], () =>
        makeRequest.get("absensi/find/" + currentUser.id).then((res)=>{
            return res.data;
        })

    );

    return (
        <div className="posts">
            {error ? "Something went wrong!" 
            : isLoading
            ? "loading"
            :  data.map((post)=>
                <Absen post={post} key={post.id} />)}
        </div>
    )
}

export default Absens