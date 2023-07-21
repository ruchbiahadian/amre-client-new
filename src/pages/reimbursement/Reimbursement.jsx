import Reims from "../../components/reims/Reims"
import AddReims from "../../components/addReims/AddReims"
import ReimTable from "../../components/reimTable/ReimTable"
import ReimTableDisetujui from "../../components/reimTableDisetujui/ReimTableDisetujui"
import ReimTableDitolak from "../../components/reimTableDitolak/ReimTableDitolak"
import ReimTableJenis from "../../components/jenisReim/JenisReim"


import "../home/home.scss"
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";



const Reimbursement = () => {
    const {currentUser} = useContext(AuthContext);

    
    const [selectedRow, setSelectedRow] = useState(1);

    const handleButtonClick = (index) => {
        
        setSelectedRow((prevIndex) => (prevIndex === index ? -1 : index));
    };


    return (
        <div className="home">
            {currentUser.role === 1 && <div className="menu">
                <button onClick={() => handleButtonClick(1)}>Diajukan</button>
                <button onClick={() => handleButtonClick(2)}>Disetujui</button>
                <button onClick={() => handleButtonClick(3)}>Ditolak</button>
                <button onClick={() => handleButtonClick(4)}>Jenis Reimbursement</button>
            </div>}

            {currentUser.role !== 1 && (<AddReims />)}
            {currentUser.role !== 1 && (<Reims /> )}


            {selectedRow === 1 && currentUser.role === 1 && (<ReimTable /> )}
            {selectedRow === 2 && currentUser.role === 1 && (<ReimTableDisetujui /> )}
            {selectedRow === 3 && currentUser.role === 1 && (<ReimTableDitolak/> )}
            {selectedRow === 4 && currentUser.role === 1 && (<ReimTableJenis/> )}

            {/* {currentUser.role === 1 && (<R(<ReimTable /> eimTable /> )} */}
            
            
        </div>
    )
}

export default Reimbursement