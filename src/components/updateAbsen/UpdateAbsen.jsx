import { useContext, useEffect, useState } from "react"
import "./updateAbsen.scss"
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import PhotoIcon from '@mui/icons-material/AddPhotoAlternate';

const UpdateAbsen = ({setUpdateOpen, reim}) =>{
    

    const [profile, setProfile] = useState(null)
    const authContext = useContext(AuthContext);

    const [texts, setTexts] = useState({
        status: "",
        acaraId: reim.acaraId
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

        profileURL = profile ? await upload(profile) : reim.absencePic;

        texts.status = "Diajukan";
        mutation.mutate({...texts, absencePic: profileURL, id: reim.id})
        setUpdateOpen(false)
    }

    return (
        <div className="updateAbsensi">
          <div className="containerUpdateAbsensi">
            <div className="top">
                <form>
                <div className="item">
                      <span>Pilih Kategori / Acara</span>
                      <select name="acaraId" onChange={handleChange} value={texts.acaraId} disabled> 
                          <option value="">Kategori / Acara</option>
                          {
                            getActiveAcara.map(acr =>(
                            <option key={acr.id} value={acr.id} >{acr.namaAcara}</option>
                          ))
                                    
                          }
                      </select>
                    </div>
  
                  <div className="item">
                      <input type="file" id="file" style={{ display: "none" }} onChange={e=>setProfile(e.target.files[0])} />
                      <label htmlFor="file">
                          <span>Tambah / Ubah bukti kehadiran</span>
                          <PhotoIcon className="icon" />
                      </label>
                  </div>
  
                  </form>
              </div>
  
            <div className="bottom">
                <div className="item">
                {!profile && <img alt="" src={`absence/${reim.absencePic}`} />}
                    {profile && <img className="file" alt="" src={URL.createObjectURL(profile)} />}
                </div>
                <div className="item">
                    <button onClick={handleClick}>Ubah Absensi</button>
                </div>
            </div>
          </div>
        </div>
  
      )
}

export default UpdateAbsen