import AkunTable from "../../components/akunTable/AkunTable"
import AkunAllTable from "../../components/akunAllTable/AkunAllTable"

import "./akun.scss"
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";



const Akun = () => {
    const {currentUser} = useContext(AuthContext);

    
    const [selectedRow, setSelectedRow] = useState(1);

    const handleButtonClick = (index) => {
        
        setSelectedRow((prevIndex) => (prevIndex === index ? -1 : index));
    };


    return (
        <div className="home">
            {currentUser.role === 1 && <div className="menu">
                <button onClick={() => handleButtonClick(1)}>Pendaftaran</button>
                <button onClick={() => handleButtonClick(2)}>Daftar Pengguna</button>
            </div>}

            {selectedRow === 1 && currentUser.role === 1 && (<AkunTable /> )}
            {selectedRow === 2 && currentUser.role === 1 && (<AkunAllTable /> )}
            
            
        </div>
    )
}

export default Akun