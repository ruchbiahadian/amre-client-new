import Reims from "../../components/reims/Reims"
import AddReims from "../../components/addReims/AddReims"
import ReimTable from "../../components/reimTable/ReimTable"
import ReimTableDisetujui from "../../components/reimTableDisetujui/ReimTableDisetujui"
import ReimTableDitolak from "../../components/reimTableDitolak/ReimTableDitolak"
import ReimTableJenis from "../../components/jenisReim/JenisReim"
import AddCircleIcon from '@mui/icons-material/AddCircle';


import "./reimbursement.scss"
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";



const Reimbursement = () => {
    const {currentUser} = useContext(AuthContext);

    const [selectedRow, setSelectedRow] = useState(1);
    const [activeButton, setActiveButton] = useState(1);
    const [addOpen, setAddOpen] = useState(false);

    const handleButtonClick = (index) => {
        setActiveButton(index)
        setSelectedRow((prevIndex) => (prevIndex === index ? -1 : index));
    };  

    return (
        <div className="reimMenu">
            {currentUser.role !== 3 && <div className="menu">
                <button onClick={() => handleButtonClick(1)} className={`${activeButton === 1 ? 'active' : ''}`}>Diajukan</button>
                <button onClick={() => handleButtonClick(2)} className={`${activeButton === 2 ? 'active' : ''}`}>Disetujui</button>
                <button onClick={() => handleButtonClick(3)} className={`${activeButton === 3 ? 'active' : ''}`}>Ditolak</button>
                <button onClick={() => handleButtonClick(4)} className={`${activeButton === 4 ? 'active' : ''}`}>Jenis Reimbursement</button>
            </div>}

            {currentUser.role === 3 && 
                <div className="containerTambah">
                    <div className="tambah" onClick={()=>setAddOpen(!addOpen)}>
                        <div className="icon">
                            <AddCircleIcon/>
                        </div>
                        Buat Pengajuan Baru
                    </div>
                </div>
            }
            
            {addOpen && currentUser.role === 3 && (<AddReims setAddOpen={setAddOpen} />)}
            {addOpen && currentUser.role === 3 && (<div className="blackBg" onClick={()=>setAddOpen(!addOpen)} />)}
            {currentUser.role === 3 && (<Reims /> )}


            {selectedRow === 1 && currentUser.role !== 3 && (<ReimTable /> )}
            {selectedRow === 2 && currentUser.role !== 3 && (<ReimTableDisetujui /> )}
            {selectedRow === 3 && currentUser.role !== 3 && (<ReimTableDitolak/> )}
            {selectedRow === 4 && currentUser.role !== 3 && (<ReimTableJenis/> )}

            {/* {currentUser.role === 1 && (<R(<ReimTable /> eimTable /> )} */}
            
            
        </div>
    )
}

export default Reimbursement