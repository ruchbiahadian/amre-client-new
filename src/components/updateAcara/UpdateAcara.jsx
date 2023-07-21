import { useContext, useState } from "react"
import "./updateAcara.scss"
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

const UpdatePost = ({setUpdateOpen, reim}) =>{
    
    const authContext = useContext(AuthContext);
    
    const [desc, setDesc] = useState({
        namaAcara: "", 
        reimbursement_status: "", 
        plafon: 0, 
        absensi_status: "",
        maxAbsen: "",
        id: reim.id
    });

    const handleChange = (e) =>{
        setDesc((prev) =>({ ...prev, [e.target.name]: e.target.value}));
    }; 

    const queryClient = useQueryClient()

    const mutationUpdate = useMutation((data) =>{
        return makeRequest.put("/acara/update", data)
    }, {
        onSuccess: () =>{
            queryClient.invalidateQueries(["posts"])
        },
    })

    const handleClick = async (e) =>{
        e.preventDefault();

        if (!desc.namaAcara || !desc.reimbursement_status || !desc.plafon || !desc.maxAbsen) {
            alert("Isi semua form kosong!");
            return;
          }
        
        mutationUpdate.mutate({...desc})

        setUpdateOpen(false)
    }

    

    return(
        <div className="update">
            Update
            <button onClick={()=>setUpdateOpen(false)}>X</button>
            
            <form action="">
               {/* <input type="file" onChange={e=>setProfile(e.target.files[0])}/> 
               <input type="text" placeholder="post" name="desc" onChange={e => setDesc(e.target.value)} />
               <button onClick={handleClick}>Update</button> */}

               <div className="item">
                    <span>Nama Acara</span>
                    <input type="text" name="namaAcara" placeholder="Masukan Nama acara" onChange={handleChange} />
               </div>
               <div className="item">
                    <span>Reimbursement Status</span>
                    <select name="reimbursement_status" onChange={handleChange}> 
                        <option value="">Pilih Status</option>
                        <option value="Aktif">Aktif</option>
                        <option value="Nonaktif">Nonaktif</option>
                    </select>
               </div>
               <div className="item">
                    <span>Plafon</span>
                    <input type="number" name="plafon" placeholder="Masukan Plafon Reimbursement" onChange={handleChange} />
               </div>
               <div className="item">
                    <span>Absensi Status</span>
                    <select name="absensi_status" onChange={handleChange}> 
                        <option value="">Pilih Status</option>
                        <option value="Aktif">Aktif</option>
                        <option value="Nonaktif">Nonaktif</option>
                    </select>
               </div>
               <div className="item">
                    <span>Maksimal Absensi</span>
                    <input type="date" name="maxAbsen" onChange={handleChange} />
               </div>
               <button onClick={handleClick}>Update</button>
            </form>
        </div>
    )
}

export default UpdatePost