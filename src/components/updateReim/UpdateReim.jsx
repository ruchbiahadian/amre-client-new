import { useContext, useEffect, useState } from "react"
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

    const [getJenisReims, setJenisReims] = useState([])
    const [getActiveAcara, setActiveAcara] = useState([])

    useEffect(() =>{
        const fetchAllSentra = async ()=>{
            try {
              const res = await makeRequest.get("/jenisReims");
              setJenisReims(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllSentra()
    }, [])

    useEffect(() =>{
      const fetchAllSentra = async ()=>{
          try {
            const res = await makeRequest.get("/acara/aktif");
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
               
                <select name="jenis" onChange={handleChange}> 
                    <option value="">Jenis Reimbursement</option>
                    {
                    getJenisReims.map(jns =>(
                    <option key={jns.id} value={jns.namaJenis}>{jns.namaJenis}</option>
                    ))
                            
                    }
                </select>

                <select name="kategori" onChange={handleChange}> 
                    <option value="">Kategori / Acara</option>
                    {
                    getActiveAcara.map(acr =>(
                    <option key={acr.id} value={acr.namaAcara}>{acr.namaAcara}</option>
                    ))
                            
                    }
                </select>

               <input type="input" placeholder="nominal" name="nominal" onChange={handleChange}  />
               <button onClick={handleClick}>Update</button>
            </form>
        </div>
    )
}

export default UpdateReim