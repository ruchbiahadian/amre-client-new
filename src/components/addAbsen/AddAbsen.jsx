import "./addAbsen.scss";
import moment from "moment/moment.js";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { useContext, useEffect, useRef, useState } from "react";
import {AuthContext} from "../../context/authContext";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import ReceiptIcon from '@mui/icons-material/Receipt';
import PhotoIcon from '@mui/icons-material/AddPhotoAlternate';

const AddAbsen = ({setAddOpen}) =>{

    const {currentUser} = useContext(AuthContext)

    const [file, setFile] = useState(null)

    const [texts, setTexts] = useState({
      status: "",
      acaraId: 0
    });

    const [getActiveAcara, setActiveAcara] = useState([])

    const formRef = useRef(null);

    const resetForm = () => {
      formRef.current.reset();
    };

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


    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   if (name === "kategori") {
    //     const selectedAcara = getActiveAcara.find((acr) => acr.namaAcara === value);
    //     setTexts((prev) => ({
    //       ...prev,
    //       [name]: value,
    //       acaraId: selectedAcara ? selectedAcara.id : 0,
    //     }));
    //   } else {
    //     setTexts((prev) => ({ ...prev, [name]: value }));
    //   }
    // };

    const handleChange = (e) =>{
      setTexts((prev) =>({ ...prev, [e.target.name]: e.target.value}));
    }; 
  

    const uploadAbsence = async ()=>{
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

    const mutation = useMutation((newPost) =>{
        return makeRequest.post("/absensi/addAbsen", newPost)
    }, {
        onSuccess: () =>{
            queryClient.invalidateQueries(["posts"])
        },
    })

    const checkAbsensi = async (acaraId)=>{
      try{
          const res = await makeRequest.get("/absensi/checkAbsen/" + acaraId);
          return res.data;
      }catch(err){
          console.log(err)
      }
  }

    const handleClick = async (e) =>{
        e.preventDefault();

        if (!texts.acaraId) {
            alert("Isi semua form kosong!");
            return;
          }

          if (!file) {
            alert("Gambar kosong");
            return;
          }
        

          const checkAbsenInfo = await checkAbsensi(texts.acaraId);

          if (checkAbsenInfo[0].created_at !== null) {
            alert("Anda sudah melakukan Absensi pada acara ini!");
            return;
          }


          const absenDate = moment(); 
          const maxAbsen = moment(checkAbsenInfo[0].max_absen);
          maxAbsen.set({ hour: 23, minute: 59, second: 59, millisecond: 0 });
  
          if (absenDate.isAfter(maxAbsen)) {
              alert("Batas maksimal absensi pada acara ini sudah terlewat!")
              return;
          }
        
        
        let imgURL = "";
        if (file) imgURL = await uploadAbsence();

        texts.status = "Diajukan"
        mutation.mutate({...texts, absencePic: imgURL})

        setAddOpen(false)
        setTexts("")
        setFile(null)
        resetForm();
    }

    return (
      <div className="addAbsen">
        <div className="container">
          <div className="top">
              <form ref={formRef}>
              <div className="item">
                      <span>Pilih Kategori / Acara</span>
                      <select name="acaraId" onChange={handleChange}> 
                          <option value="">Kategori / Acara</option>
                          {
                            getActiveAcara.map(acr =>(
                            <option key={acr.id} value={acr.id} >{acr.namaAcara}</option>
                          ))
                                    
                          }
                      </select>
                    </div>

                <div className="item">
                    <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} required />
                    <label htmlFor="file">
                        <span>Tambah / Ubah bukti kehadiran</span>
                        <PhotoIcon className="icon" />
                    </label>
                </div>

                </form>
            </div>

          <div className="bottom">
              <div className="item">
                  {file && <img className="file" alt="" src={URL.createObjectURL(file)} />}
              </div>
              <div className="item">
                  <button onClick={handleClick}>Tambah Absensi</button>
              </div>
          </div>
        </div>
      </div>

    )
  }

export default AddAbsen