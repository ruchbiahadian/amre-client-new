import { useContext, useState } from "react"
import "./update.scss"
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import PhotoIcon from '@mui/icons-material/AddPhotoAlternate';

const Update = ({setOpenUpdate, user, navigate}) =>{

    const [profile, setProfile] = useState(null)
    const authContext = useContext(AuthContext);

    const upload = async (file)=>{
        try{
            const formData = new FormData();
            formData.append("file", file)
            const res = await makeRequest.post("/uploadProfile", formData);
            return res.data;
        }catch(err){
            console.log(err)
        }
    }

    const queryClient = useQueryClient()

    const mutation = useMutation((user) =>{
        return makeRequest.put("/users/updateUserProfile", user)
    }, {
        onSuccess: () =>{
            queryClient.invalidateQueries(["user"])
        },
    })

    const handleClick = async (e) =>{
        e.preventDefault();
        let profileURL;

        profileURL = profile ? await upload(profile) : user.profilePic;

        if (profileURL) {
            authContext.updateCurrentUser({ ...authContext.currentUser, profilePic: profileURL });
          }

        mutation.mutate({profilePic: profileURL})
        // navigate("/")
        alert("Profil berhasil diupdate")
        window.location.reload()
    }

    return(
        <div className="updateProfile">
            <form action="">
               <input type="file" id="file" onChange={e=>setProfile(e.target.files[0])} style={{display: "none"}}/>
               {!profile && 
                    <label htmlFor="file">
                        <PhotoIcon className="icon"/> 
                    </label>
               }
               {profile && <img alt="" src={URL.createObjectURL(profile)} />}
               {profile && <button onClick={handleClick}>Update</button>}
            </form>
        </div>
    )
}

export default Update