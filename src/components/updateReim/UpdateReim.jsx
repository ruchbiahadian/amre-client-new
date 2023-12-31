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
        nominal: reim.nominal,
        jenis: reim.jenis,
        acaraId: reim.acaraId
    });

    const [getJenisReims, setJenisReims] = useState([])
    const [getActiveAcara, setActiveAcara] = useState([])

    const fetchDataReim = () => {
      const url = `/jenisReims`;

      return makeRequest.get(url)
        .then((res) => res.data)
        .catch((error) => {
          throw error;
        });
    };

    useEffect(() => {
      fetchDataReim()
        .then((data) => {
          setJenisReims(data);
        })
        .catch((error) => {
        });
    },[]);

    const fetchAktifAcara = () => {
      const url = `/acara/aktif`;

      return makeRequest.get(url)
        .then((res) => res.data)
        .catch((error) => {
          throw error;
        });
    };

    useEffect(() => {
      fetchAktifAcara()
        .then((data) => {
          setActiveAcara(data);
        })
        .catch((error) => {
        });
    },[]);

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

        if (!texts.acaraId || !texts.nominal || !texts.jenis) {
            alert("Isi semua form kosong!");
            return;
          }

          const checkReimInfo = await checkReim(reim.acaraId);

          if (parseInt(checkReimInfo[0].plafon_value) !== 0) {

            var totalNominalInt;
            if(reim.status === "Diajukan"){
              totalNominalInt= parseInt(checkReimInfo[0].total_nominal-reim.nominal);
            }else{
              totalNominalInt= parseInt(checkReimInfo[0].total_nominal);
            }
        
          
            if (!isNaN(totalNominalInt)) {
              if ((parseInt(texts.nominal) + totalNominalInt) > parseInt(checkReimInfo[0].plafon_value)) {
                alert("Maksimal update pengajuan reimbursement ini, pada acara ini tersisa " + (parseInt(checkReimInfo[0].plafon_value) - totalNominalInt) + " dari plafon " + parseInt(checkReimInfo[0].plafon_value));
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
                    <button onClick={handleClick}>Update Reimbursement</button>
                </div>
            </div>
          </div>
        </div>

    )
}

export default UpdateReim