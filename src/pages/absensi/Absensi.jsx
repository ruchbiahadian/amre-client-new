import Absens from "../../components/absens/Absens"
import AddAbsen from "../../components/addAbsen/AddAbsen"
import AbsensiTable from "../../components/absensiTable/AbsensiTable"
import AbsensiTableDisetujui from "../../components/absensiTabelDisetujui/AbsensiTableDisetujui"
import AbsensiTableDitolak from "../../components/absensiTabelDitolak/AbsensiTableDitolak"

import "./absensi.scss"
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";



const Reimbursement = () => {
    const {currentUser} = useContext(AuthContext);
    const [activeButton, setActiveButton] = useState(1);
    
    const [selectedRow, setSelectedRow] = useState(1);

    const handleButtonClick = (index) => {
        setActiveButton(index)
        setSelectedRow((prevIndex) => (prevIndex === index ? -1 : index));
    };


    return (
        <div className="absensiMenu">
            {currentUser.role === 1 && <div className="menu">
                <button onClick={() => handleButtonClick(1)} className={`${activeButton === 1 ? 'active' : ''}`}>Diajukan</button>
                <button onClick={() => handleButtonClick(2)} className={`${activeButton === 2 ? 'active' : ''}`}>Disetujui</button>
                <button onClick={() => handleButtonClick(3)} className={`${activeButton === 3 ? 'active' : ''}`}>Ditolak</button>
            </div>}

            {currentUser.role !== 1 && (<AddAbsen /> )}
            {currentUser.role !== 1 && (<Absens /> )}

            {selectedRow === 1 && currentUser.role === 1 && (<AbsensiTable /> )}
            {selectedRow === 2 && currentUser.role === 1 && (<AbsensiTableDisetujui /> )}
            {selectedRow === 3 && currentUser.role === 1 && (<AbsensiTableDitolak/> )}
            
            
        </div>
    )
}

export default Reimbursement