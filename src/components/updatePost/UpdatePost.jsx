import { useContext, useState } from "react"
import "./updateReim.scss"
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

const UpdatePost = ({setUpdateOpen, reim}) =>{
    

    const [profile, setProfile] = useState(null)
    const authContext = useContext(AuthContext);

    const [desc, setDesc] = useState("");
    console.log(desc)

    const upload = async (file)=>{
        try{
            const formData = new FormData();
            formData.append("file", file)
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        }catch(err){
            console.log(err)
        }
    }

    const queryClient = useQueryClient()

    const mutation = useMutation((reim) =>{
        return makeRequest.put("/posts/update", reim)
    }, {
        onSuccess: () =>{
            queryClient.invalidateQueries(["posts"])
        },
    })

    const handleClick = async (e) =>{
        e.preventDefault();
        let profileURL;

        profileURL = profile ? await upload(profile) : reim.img;
        
        mutation.mutate({desc, img: profileURL, id: reim.id})
        setUpdateOpen(false)
    }

    return(
        <div className="update">
            Update
            <button onClick={()=>setUpdateOpen(false)}>X</button>
            
            <form action="">
               <input type="file" onChange={e=>setProfile(e.target.files[0])}/> 
               <input type="text" placeholder="post" name="desc" onChange={e => setDesc(e.target.value)} />
               <button onClick={handleClick}>Update</button>
            </form>
        </div>
    )
}

export default UpdatePost