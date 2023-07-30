import { useContext, useState } from "react"
import "./updatePost.scss"
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';


const UpdatePost = ({setUpdateOpen, reim}) =>{
    

    const [profile, setProfile] = useState(null)
    const authContext = useContext(AuthContext);
    const {currentUser} = useContext(AuthContext)

    const [desc, setDesc] = useState(reim.desc);

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
        let text;

        text = desc.length === 0 ? reim.desc : desc;
        profileURL = profile ? await upload(profile) : reim.img;
        
        mutation.mutate({text, img: profileURL, id: reim.id})
        setUpdateOpen(false)
    }


    return (
        <div className="updatePost">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={`/profile/`+currentUser.profilePic} alt="" />
                        <input type="text" placeholder={`Buat berita baru?`} 
                        onChange={(e) => setDesc(e.target.value)}
                        name="desc" 
                        value={desc}/>
                    </div>
                    <div className="right">
                        {profile && <img className="file" alt="" src={URL.createObjectURL(profile)} />}
                    </div>
                    
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input type="file" id="file" style={{display: "none"}} onChange={(e) => setProfile(e.target.files[0])}/>
                        <label htmlFor="file">
                            <div className="item">
                                <AddAPhotoOutlinedIcon/>
                                <span>Tambah Gambar</span>
                            </div>
                        </label>
                    </div>
                    <div className="right">
                        <button onClick={handleClick}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default UpdatePost