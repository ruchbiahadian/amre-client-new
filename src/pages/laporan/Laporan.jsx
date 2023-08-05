import "./laporan.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import LaporanTable from "../../components/laporanTable/LaporanTable";
import LaporanAbsenTable from "../../components/laporanAbsenTable/LaporanAbsenTable";
import { makeRequest } from "../../axios";

const Laporan = () => {
  const { currentUser } = useContext(AuthContext);
  const [activeButton, setActiveButton] = useState(1);
  const [selectedRow, setSelectedRow] = useState(1);

  const [dataReim, setDataReim] = useState([]);
  const [dataAbsen, setDataAbsen] = useState([]);

  const [texts, setTexts] = useState({
    acaraId: 0,
  });

  const [texts2, setTexts2] = useState({
    acaraId: 0,
  });

  const fetchData = (selectedRow) => {
    const url =
      selectedRow === 1 ? `/acara/nonaktif` : `/acara/nonaktifAbsen`;

    return makeRequest
      .get(url)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    fetchData(selectedRow)
      .then((data) => {
        if (selectedRow === 1) setDataReim(data);
        else setDataAbsen(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedRow]);

  const handleChange = (e) => {
    const { name, value } = e.target;
      if (selectedRow === 1){
        setTexts((prev) => ({ ...prev, [name]: value }));
      }else{
        setTexts2((prev) => ({ ...prev, [name]: value }));
      }
  };

  const handleClickReset = () => {
    if (selectedRow === 1) {
      setTexts({
        acaraId: "",
      });
    } else {
      setTexts2({
        acaraId: "",
      });
    }
  };

  const handleButtonClick = (index) => {
    setActiveButton(index);
    setSelectedRow((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div className="laporan">
      <div className="menu">
        {currentUser.role !== 3 && (
          <button
            onClick={() => handleButtonClick(1)}
            className={`${activeButton === 1 ? "active" : ""}`}
          >
            Reimbursement
          </button>
        )}
        {currentUser.role !== 3 && (
          <button
            onClick={() => handleButtonClick(2)}
            className={`${activeButton === 2 ? "active" : ""}`}
          >
            Absensi
          </button>
        )}
      </div>

      {selectedRow === 1 && currentUser.role !== 3 && (
        <div className="konten">
          <div className="pilihAcara">
            <select name="acaraId" onChange={handleChange}>
              <option value="">Pilih Kategori / Acara</option>
              {dataReim.map((acr) => (
                <option key={acr.id} value={acr.id}>
                  {acr.namaAcara}
                </option>
              ))}
            </select>
            <button onClick={handleClickReset}>Reset</button>
          </div>
        </div>
      )}

      {selectedRow === 2 && currentUser.role !== 3 && (
        <div className="konten">
          <div className="pilihAcara">
            <select name="acaraId" onChange={handleChange}>
              <option value="">Pilih Kategori / Acara</option>
              {dataAbsen.map((acr) => (
                <option key={acr.id} value={acr.id}>
                  {acr.namaAcara}
                </option>
              ))}
            </select>
            <button onClick={handleClickReset}>Reset</button>
          </div>
        </div>
      )}

      {selectedRow === 1 && texts.acaraId > 0 && (
        <LaporanTable acaraId={texts.acaraId} />
      )}

      {selectedRow === 2 && texts2.acaraId > 0 && (
        <LaporanAbsenTable acaraId={texts2.acaraId} />
      )}


    </div>
  );
};

export default Laporan;
