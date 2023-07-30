import "./addAcara.scss";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { useContext, useEffect, useRef, useState } from "react";
import {AuthContext} from "../../context/authContext";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";

const AddAcara = ({setAddOpen}) =>{

    const {currentUser} = useContext(AuthContext)

    const [texts, setTexts] = useState({
        namaAcara: "", 
        reimbursement_status: "", 
        plafon: 0, 
        absensi_status: "",
        maxAbsen: ""
    });
    
  const formRef = useRef(null);

  const resetForm = () => {
    formRef.current.reset();
  };

    const handleChange = (e) =>{
        setTexts((prev) =>({ ...prev, [e.target.name]: e.target.value}));
    }; 
    
    const queryClient = useQueryClient()

    const mutation = useMutation((newPost) =>{
        return makeRequest.post("/acara/tambah", newPost)
    }, {
        onSuccess: () =>{
            queryClient.invalidateQueries(["posts"])
        },
    })

    const handleClick = async (e) =>{
        e.preventDefault();


        if (!texts.namaAcara || !texts.reimbursement_status || !texts.plafon || !texts.maxAbsen) {
            alert("Isi semua form kosong!");
          return;
        }

        mutation.mutate({...texts})

        setAddOpen(false)
        setTexts("")
        resetForm();
    }

    return (
        <div className="addAcara">
          <div className="container">
                <form ref={formRef}>
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
                  <button onClick={handleClick}>Tambah</button>
                </form>
          </div>
        </div>

    )
}

export default AddAcara