import "./laporan.scss"
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import LaporanTable from "../../components/laporanTable/LaporanTable"
import { makeRequest } from "../../axios";



const Laporan = () => {
    const {currentUser} = useContext(AuthContext);
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
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "kategori") {
          const selectedAcara = getNonctiveAcara.find((acr) => acr.namaAcara === value);
          setTexts((prev) => ({
            ...prev,
            [name]: value,
            acaraId: selectedAcara ? selectedAcara.id : 0,
          }));
        } else {
          setTexts((prev) => ({ ...prev, [name]: value }));
        }
      };

      const handleClickReset =()=>{
        setTexts(0)
      }

      const [activeButton, setActiveButton] = useState(1);
      const [selectedRow, setSelectedRow] = useState(1);

      const handleButtonClick = (index) => {
        setActiveButton(index)
        setSelectedRow((prevIndex) => (prevIndex === index ? -1 : index));
    };

    return (
        <div className="laporan">

            <div className="menu">
                    {currentUser.role !== 3 && <button onClick={() => handleButtonClick(1)} className={`${activeButton === 1 ? 'active' : ''}`}>Reimbursement</button>}
                    {currentUser.role !== 3 && <button onClick={() => handleButtonClick(2)} className={`${activeButton === 2 ? 'active' : ''}`}>Absensi</button>}
            </div>

            {(selectedRow === 1 && currentUser.role !== 3) && 
            <div className="konten">
                <div className="pilihAcara">
                    <select name="kategori" onChange={handleChange}> 
                        <option value="">Pilih Kategori / Acara</option>
                        {
                        getNonctiveAcara.map(acr =>(
                        <option key={acr.id} value={acr.namaAcara}>{acr.namaAcara}</option>
                        ))
                                
                        }
                    </select>
                    <button onClick={handleClickReset}>Reset</button>
                </div>
            </div>}

            {(selectedRow === 1 && texts.acaraId > 0) && <LaporanTable acaraId={texts.acaraId} />}

        </div>
    )
}

export default Laporan