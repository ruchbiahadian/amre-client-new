import "./acara.scss"
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import AcaraTable from "../../components/acaraTable/AcaraTable"
import AddAcara from "../../components/addAcara/AddAcara"
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Acara = () => {
    const {currentUser} = useContext(AuthContext);
    const [addOpen, setAddOpen] = useState(false);

    return (
        <div className="acara">
            <div className="container">
                <div className="tambah" onClick={()=>setAddOpen(!addOpen)}>
                    <div className="icon">
                        <AddCircleIcon/>
                    </div>
                    Buat Acara Baru
                </div>
                {addOpen && currentUser.role !== 3 && (<AddAcara setAddOpen={setAddOpen} />)}
                {addOpen && currentUser.role !== 3 && (<div className="blackBg" onClick={()=>setAddOpen(!addOpen)} />)}
                {currentUser.role !== 3 && (<AcaraTable/>)}
            </div>
        </div>
    )
}

export default Acara