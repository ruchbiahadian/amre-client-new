import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import "./invoiceComparison.scss";
import { makeRequest } from "../../axios";
import Comparator from "../../components/comparator/Comparator";

const InvoiceComparison = () => {
    const { currentUser } = useContext(AuthContext);
    const [getNonctiveAcara, setNonactiveAcara] = useState([])
    const [texts, setTexts] = useState({
        acaraId: ""
    });

    useEffect(() =>{
        const fetchAllSentra = async ()=>{
            try {
              const res = await makeRequest.get("/acara/nonaktif");
              setNonactiveAcara(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllSentra()
    }, [])

    const handleChange = (e) =>{
        setTexts((prev) =>({ ...prev, [e.target.name]: e.target.value}));
    }; 

    const handleClickReset =()=>{
        setTexts(0)
      }

    return (
        <div className="invoiceComparison">
            <div className="container">
                {currentUser.role !== 3 && 
                <div className="konten">
                    <div className="pilihAcara">
                    <select name="acaraId" onChange={handleChange}> 
                          <option value="">Kategori / Acara</option>
                          {
                            getNonctiveAcara.map(acr =>(
                            <option key={acr.id} value={acr.id} >{acr.namaAcara}</option>
                          ))
                                    
                          }
                      </select>
                        <button onClick={handleClickReset}>Reset</button>
                    </div>
                </div>}
            </div>

            {texts.acaraId > 0 && (
                <Comparator acaraId={texts.acaraId} />
            )}

        </div>
    );
};

export default InvoiceComparison;
