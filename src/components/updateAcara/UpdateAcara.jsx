import { useContext, useRef, useState } from "react"
import "./updateAcara.scss"
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

const UpdatePost = ({setUpdateOpen, reim}) =>{
    
    const authContext = useContext(AuthContext);

    const formRef = useRef(null);

    const formatDate = (dateString) => {
        dateString = (() => new Date(dateString).toLocaleDateString('en-GB'))()
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
      };

    const resetForm = () => {
      formRef.current.reset();
    };
    
    const [desc, setDesc] = useState({
        namaAcara: reim.namaAcara, 
        reimbursement_status: reim.reimbursement_status, 
        plafon: reim.plafon, 
        absensi_status: reim.absensi_status,
        maxAbsen: formatDate(reim.maxAbsen),
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
        resetForm();
        setUpdateOpen(false)
    }
    

return (
        <div className="updateAcara">
          <div className="containerAcara">
                <form ref={formRef}>
                  <div className="item">
                        <span>Nama Acara</span>
                        <input type="text" name="namaAcara" placeholder="Masukan Nama acara" onChange={handleChange} value={desc.namaAcara} />
                  </div>
                  <div className="item">
                        <span>Reimbursement Status</span>
                        <select name="reimbursement_status" onChange={handleChange} value={desc.reimbursement_status}> 
                            <option value="">Pilih Status</option>
                            <option value="Aktif">Aktif</option>
                            <option value="Nonaktif">Nonaktif</option>
                        </select>
                  </div>
                  <div className="item">
                        <span>Plafon</span>
                        <input type="number" name="plafon" placeholder="Masukan Plafon Reimbursement" onChange={handleChange} value={desc.plafon} />
                  </div>
                  <div className="item">
                        <span>Absensi Status</span>
                        <select name="absensi_status" onChange={handleChange} value={desc.absensi_status}> 
                            <option value="">Pilih Status</option>
                            <option value="Aktif">Aktif</option>
                            <option value="Nonaktif">Nonaktif</option>
                        </select>
                  </div>
                  <div className="item">
                        <span>Maksimal Absensi</span>
                        <input type="date" name="maxAbsen" onChange={handleChange} value={desc.maxAbsen} />
                  </div>
                  <button onClick={handleClick}>Update</button>
                </form>
          </div>
        </div>

    )

    
}

export default UpdatePost