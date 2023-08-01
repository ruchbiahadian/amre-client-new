import "./share.scss";
import { useContext, useState } from "react";
import {AuthContext} from "../../context/authContext";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

const Share = ({setAddOpen}) =>{

    const {currentUser} = useContext(AuthContext)

    const [file, setFile] = useState(null)
    const [desc, setDesc] = useState("")

    const upload = async ()=>{
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

    const mutation = useMutation((newPost) =>{
        return makeRequest.post("/posts", newPost)
    }, {
        onSuccess: () =>{
            queryClient.invalidateQueries(["posts"])
        },
    })

    const handleClick = async (e) =>{
        e.preventDefault();

        if(!desc && !file){
            alert("Masukkan teks atau gambar!")
            return;
        }

        let imgURL = "";
        if (file) imgURL = await upload();
        mutation.mutate({desc, img: imgURL})
        setAddOpen(false)
        setDesc("")
        setFile(null)
    }

    return (
        <div className="sharee">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={`/profile/`+currentUser.profilePic} alt="" />
                        <input type="text" placeholder={`Buat berita baru?`} 
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc} />
                    </div>
                    <div className="right">
                        {file && <img className="file" alt="" src={URL.createObjectURL(file)} />}
                    </div>
                    
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input type="file" id="file" style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])}/>
                        <label htmlFor="file">
                            <div className="item">
                                <AddAPhotoOutlinedIcon/>
                                <span>Tambah Gambar</span>
                            </div>
                        </label>
                    </div>
                    <div className="right">
                        <button onClick={handleClick}>Tambah</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Share