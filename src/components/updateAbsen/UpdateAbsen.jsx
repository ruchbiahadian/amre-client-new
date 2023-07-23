import { useContext, useEffect, useState } from "react"
import "./updateAbsen.scss"
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

const UpdateAbsen = ({setUpdateOpen, reim}) =>{
    

    const [profile, setProfile] = useState(null)
    const authContext = useContext(AuthContext);

    const [texts, setTexts] = useState({
        status: "",
        kategori: ""
    });
    const [getActiveAcara, setActiveAcara] = useState([])

    useEffect(() =>{
        const fetchAllSentra = async ()=>{
            try {
              const res = await makeRequest.get("/acara/aktifAbsen");
              setActiveAcara(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllSentra()
    }, [])

    const handleChange = (e) =>{
        setTexts((prev) =>({ ...prev, [e.target.name]: e.target.value}));
    }; 

    const upload = async (file)=>{
        try{
            const formData = new FormData();
            formData.append("file", file)
            const res = await makeRequest.post("/uploadAbsence", formData);
            return res.data;
        }catch(err){
            console.log(err)
        }
    }

    const queryClient = useQueryClient()

    const mutation = useMutation((reim) =>{
        return makeRequest.put("/absensi/update", reim)
    }, {
        onSuccess: () =>{
            queryClient.invalidateQueries(["posts"])
        },
    })

    const handleClick = async (e) =>{
        e.preventDefault();
        let profileURL;

        if (!texts.kategori) {
            alert("Isi form kosong!");
            return;
          }

        profileURL = profile ? await upload(profile) : reim.absencePic;

        texts.status = "Diajukan";
        mutation.mutate({...texts, absencePic: profileURL, id: reim.id})
        setUpdateOpen(false)
    }

    return(
        <div className="update">
            Update
            <button onClick={()=>setUpdateOpen(false)}>X</button>
            
            <form action="">
               <input type="file" onChange={e=>setProfile(e.target.files[0])}/> 

                 <form>
                    <select name="kategori" onChange={handleChange}> 
                        <option value="">Kategori / Acara</option>
                        {
                            getActiveAcara.map(acr =>(
                            <option key={acr.id} value={acr.namaAcara}>{acr.namaAcara}</option>
                        ))
                                    
                        }
                    </select>
                </form>

               <button onClick={handleClick}>Update</button>
            </form>
        </div>
    )
}

export default UpdateAbsen