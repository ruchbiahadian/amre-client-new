import "./acara.scss"
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import AcaraTable from "../../components/acaraTable/AcaraTable"



const Acara = () => {
    const {currentUser} = useContext(AuthContext);


    return (
        <div className="home">
            {currentUser.role === 1 && (<AcaraTable/>)}
        </div>
    )
}

export default Acara