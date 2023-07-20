import { useContext, useState } from "react"
import "./updateReim.scss"
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

const UpdateReim = ({setUpdateOpen, reim}) =>{
    

    const [profile, setProfile] = useState(null)
    const authContext = useContext(AuthContext);

    const [texts, setTexts] = useState({
        status: "",
        kategori: "",
        nominal: "",
        jenis: ""
    });

    const handleChange = (e) =>{
        setTexts((prev) =>({ ...prev, [e.target.name]: e.target.value}));
    }; 

    const upload = async (file)=>{
        try{
            const formData = new FormData();
            formData.append("file", file)
            const res = await makeRequest.post("/uploadInvoice", formData);
            return res.data;
        }catch(err){
            console.log(err)
        }
    }

    const queryClient = useQueryClient()

    const mutation = useMutation((reim) =>{
        return makeRequest.put("/reims/update", reim)
    }, {
        onSuccess: () =>{
            queryClient.invalidateQueries(["posts"])
        },
    })

    const handleClick = async (e) =>{
        e.preventDefault();
        let profileURL;

        if (!texts.kategori || !texts.nominal || !texts.jenis) {
            alert("Isi semua form kosong!");
            return;
          }

        profileURL = profile ? await upload(profile) : reim.invoicePic;

        texts.status = "Diajukan";
        mutation.mutate({...texts, invoicePic: profileURL, id: reim.id})
        setUpdateOpen(false)
    }

    return(
        <div className="update">
            Update
            <button onClick={()=>setUpdateOpen(false)}>X</button>
            
            <form action="">
               <input type="file" onChange={e=>setProfile(e.target.files[0])}/> 
               {/* <input type="text" placeholder="status" name="status" onChange={handleChange} /> */}
               <input type="text" placeholder="kategori" name="kategori" onChange={handleChange}  />
               <input type="input" placeholder="nominal" name="nominal" onChange={handleChange}  />
               <input type="text" placeholder="jenis" name="jenis" onChange={handleChange}  />
               <button onClick={handleClick}>Update</button>
            </form>
        </div>
    )
}

export default UpdateReim