import { useContext, useEffect, useState } from "react"
import "./updateReim.scss"
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import ReceiptIcon from '@mui/icons-material/Receipt';

const UpdateReim = ({setUpdateOpen, reim}) =>{
    
    const temProfile = reim.invoicePic;
    const [profile, setProfile] = useState(null)
    const authContext = useContext(AuthContext);

    const [texts, setTexts] = useState({
        status: reim.status,
        kategori: reim.kategori,
        nominal: reim.nominal,
        jenis: reim.jenis
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

    const checkReim = async (acaraId)=>{
        try{
            const res = await makeRequest.get("/reims/checkReim/" + acaraId);
            return res.data;
        }catch(err){
            console.log(err)
        }
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        let profileURL;

        if (!texts.kategori || !texts.nominal || !texts.jenis) {
            alert("Isi semua form kosong!");
            return;
          }

          const checkReimInfo = await checkReim(reim.acaraId);

          if (parseInt(checkReimInfo[0].plafon_value) !== 0) {

            var totalNominalInt = parseInt(checkReimInfo[0].total_nominal);
                if (!isNaN(totalNominalInt)) {
                    if ((parseInt(texts.nominal) + (totalNominalInt-reim.nominal)) > parseInt(checkReimInfo[0].plafon_value)) {
                        alert("Maksimal pengajuan reimbursement anda pada acara ini tersisa " + (parseInt(checkReimInfo[0].plafon_value) - (totalNominalInt-reim.nominal)) + " dari plafon " + parseInt(checkReimInfo[0].plafon_value));
                        return;
                    }
                }
            }
          

        profileURL = profile ? await upload(profile) : reim.invoicePic;

        texts.status = "Diajukan";
        mutation.mutate({...texts, invoicePic: profileURL, id: reim.id})
        setUpdateOpen(false)
    }

    return (
        <div className="updateReim">
          <div className="containerReim">
            <div className="top">
                <form>
                    <div className="item">
                      <span>Jenis Reimbursement</span>
                      <select name="jenis" onChange={handleChange} value={texts.jenis}> 
                            <option value="">Pilih Jenis Reimbursement</option>
                            {
                              getJenisReims.map(jns =>(
                              <option key={jns.id} value={jns.namaJenis}>{jns.namaJenis}</option>
                            ))
                                      
                            }
                        </select>
                    </div>

                    <div className="item">
                      <span>Pilih Kategori / Acara</span>
                      <select name="kategori" onChange={handleChange} value={texts.kategori}> 
                          <option value="">Kategori / Acara</option>
                          {
                            getActiveAcara.map(acr =>(
                            <option key={acr.id} value={acr.namaAcara}>{acr.namaAcara}</option>
                          ))
                                    
                          }
                      </select>
                    </div>

                    <div className="item">
                      <span>Nominal</span>
                      <input type="number" placeholder="Masukkan nominal" name="nominal" onChange={handleChange} value={texts.nominal} />
                    </div>

                  <div className="item">
                      <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setProfile(e.target.files[0])} />
                      <label htmlFor="file">
                          <span>Tambah / Ubah Invoice</span>
                          <ReceiptIcon className="icon" />
                      </label>
                  </div>

                  </form>
              </div>



            <div className="bottom">
                <div className="item">
                    {!profile && <img alt="" src={`invoice/${reim.invoicePic}`} />}
                    {profile && <img className="file" alt="" src={URL.createObjectURL(profile)} />}
                </div>
                <div className="item">
                    <button onClick={handleClick}>Tambah Reimbursement</button>
                </div>
            </div>
          </div>
        </div>

    )
}

export default UpdateReim