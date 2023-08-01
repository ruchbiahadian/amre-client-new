import AkunTable from "../../components/akunTable/AkunTable"
import AkunAllTable from "../../components/akunAllTable/AkunAllTable"
import AdminTable from "../../components/adminTable/AdminTable"
import AddAdmin from "../../components/addAdmin/AddAdmin"
import "./akun.scss"
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';



const Akun = () => {
    const {currentUser} = useContext(AuthContext);
    const [activeButton, setActiveButton] = useState(1);
    const [addOpen, setAddOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(1);

    const handleButtonClick = (index) => {
        setActiveButton(index)
        setSelectedRow((prevIndex) => (prevIndex === index ? -1 : index));
    };


    return (
        <div className="akunMenu">
            <div className="menu">
                    {currentUser.role !== 3 && <button onClick={() => handleButtonClick(1)} className={`${activeButton === 1 ? 'active' : ''}`}>Pendaftaran</button>}
                    {currentUser.role !== 3 && <button onClick={() => handleButtonClick(2)} className={`${activeButton === 2 ? 'active' : ''}`}>Disetujui</button>}
                    {currentUser.role === 1 &&<button onClick={() => handleButtonClick(3)} className={`${activeButton === 3 ? 'active' : ''}`}>Admin</button>}
            </div>

            {selectedRow === 3 && currentUser.role === 1 && 
                (
                    <div className="tambah" onClick={()=>setAddOpen(!addOpen)}>
                        <div className="icon">
                            <AddCircleIcon/>
                        </div>
                        Tambah Admin Baru
                    </div>
                )
            }
            
            {addOpen && currentUser.role === 1 && (<AddAdmin setAddOpen={setAddOpen} /> )}
            {addOpen && currentUser.role === 1 && (<div className="blackBg" onClick={()=>setAddOpen(!addOpen)} />)}
            {selectedRow === 1 && currentUser.role !== 3 && (<AkunTable /> )}
            {selectedRow === 2 && currentUser.role !== 3 && (<AkunAllTable /> )}
            {selectedRow === 3 && currentUser.role === 1 && (<AdminTable /> )}
            
        </div>
    )
}

export default Akun