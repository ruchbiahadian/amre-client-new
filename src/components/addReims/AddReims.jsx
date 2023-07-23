import "./addReims.scss";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { useContext, useEffect, useRef, useState } from "react";
import {AuthContext} from "../../context/authContext";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";

const AddReims = () =>{

    const {currentUser} = useContext(AuthContext)

    const [file, setFile] = useState(null)

    const [texts, setTexts] = useState({
        status: "",
        kategori: "",
        nominal: "",
        jenis: "",
        acaraId: 0
    });
    

  const [getJenisReims, setJenisReims] = useState([])
  const [getActiveAcara, setActiveAcara] = useState([])

  const formRef = useRef(null);

  const resetForm = () => {
    formRef.current.reset();
  };

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

    // const handleChange = (e) =>{
    //     setTexts((prev) =>({ ...prev, [e.target.name]: e.target.value}));
    // }; 

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "kategori") {
        const selectedAcara = getActiveAcara.find((acr) => acr.namaAcara === value);
        setTexts((prev) => ({
          ...prev,
          [name]: value,
          acaraId: selectedAcara ? selectedAcara.id : 0,
        }));
      } else {
        setTexts((prev) => ({ ...prev, [name]: value }));
      }
    };

    const uploadInvoice = async ()=>{
        try{
            const formData = new FormData();
            formData.append("file", file)
            const res = await makeRequest.post("/uploadInvoice", formData);
            return res.data;
        }catch(err){
            console.log(err)
        }
    }

    const infoRek = async ()=>{
      try{
          const res = await makeRequest.get("/rekening/find/" + currentUser.id);
          return res.data;
      }catch(err){
          console.log(err)
      }
  }

    const checkReim = async (acaraId)=>{
      try{
          const res = await makeRequest.get("/reims/checkReim/" + acaraId);
          return res.data;
      }catch(err){
          console.log(err)
      }
  }
    

    const queryClient = useQueryClient()

    const mutation = useMutation((newPost) =>{
        return makeRequest.post("/reims/add", newPost)
    }, {
        onSuccess: () =>{
            queryClient.invalidateQueries(["posts"])
        },
    })

    const handleClick = async (e) =>{
        e.preventDefault();

        if (!texts.kategori || !texts.nominal || !texts.jenis) {
            alert("Isi semua form kosong!");
            return;
          }

          if (!file) {
            alert("Upload Invoice!");
            return;
          }

        const checkReimInfo = await checkReim(texts.acaraId);
        
        if (parseInt(checkReimInfo[0].plafon_value) !== 0) {
          if (parseInt(texts.nominal) > parseInt(checkReimInfo[0].plafon_value)) {
            alert("Maksimal " + parseInt(checkReimInfo[0].plafon_value));
            return;
          }
        
          var totalNominalInt = parseInt(checkReimInfo[0].total_nominal);
        
          if (!isNaN(totalNominalInt)) {
            if ((parseInt(texts.nominal) + totalNominalInt) > parseInt(checkReimInfo[0].plafon_value)) {
              alert("Maksimal pengajuan reimbursement anda pada acara ini tersisa " + (parseInt(checkReimInfo[0].plafon_value) - totalNominalInt) + " dari plafon " + parseInt(checkReimInfo[0].plafon_value));
              return;
            }
          }
        }
        


        const rekeningInfo = await infoRek();
        

        if (rekeningInfo[0].nomor === "Belum diisi" || rekeningInfo[0].bank === "Belum diisi" || rekeningInfo[0].namaRek === "Belum diisi") {
          alert("Isi terlebih dahulu data rekening di halaman profil!");
          return;
        }

        let imgURL = "";
        if (file) imgURL = await uploadInvoice();

        texts.status = "Diajukan"
        mutation.mutate({...texts, invoicePic: imgURL})

        setTexts("")
        setFile(null)
        resetForm();
    }

    return (
        <div className="share">
  <div className="container">
    <div className="top">
      <div className="left">
        <form ref={formRef}>

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
          <input type="number" placeholder="nominal" name="nominal" onChange={handleChange} />
        </form>

      </div>
      <div className="right">
        {file && <img className="file" alt="" src={URL.createObjectURL(file)} />}
      </div>
    </div>
    <hr />
    <div className="bottom">
      <div className="left">
        <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} required />
        <label htmlFor="file">
          <div className="item">
            <AddPhotoAlternateOutlinedIcon />
            <span>Add Image</span>
          </div>
        </label>
      </div>
      <div className="right">
        <button onClick={handleClick}>Share</button>
      </div>
    </div>
  </div>
</div>

    )

}

export default AddReims