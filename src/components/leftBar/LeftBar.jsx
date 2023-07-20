import "./leftBar.scss";
import Icon from "../../gaming.png";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const LeftBar = () =>{

    const {currentUser, logout} = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["user"], () =>
        makeRequest.get("/users/find/" + currentUser.id).then((res)=>{
            return res.data;
        })
    );

    const handleClick = async (e) =>{
        e.preventDefault();

        try{
            await axios.post("http://localhost:8800/api/auth/logout", {}, {withCredentials: true});
            await logout();
            alert("Anda berhasil logout!");
            Navigate("/login");
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src={`/profile/` + currentUser.profilePic} alt="" />
                        <Link to={`/profile/${currentUser.id}`} style={{textDecoration: "none", color: "inherit"}}>
                            <span className="name">Profil</span>
                        </Link>
                    </div>
                    <div className="item">
                        <img src={Icon} alt=""/>
                        <Link to="/" style={{textDecoration: "none", color: "inherit"}}>
                            <span className="name">Pengumuman</span>
                        </Link>
                    </div>
                    <div className="item">
                        <img src={Icon} alt=""/>
                        <Link to="/reimbursement" style={{textDecoration: "none", color: "inherit"}}>
                            <span>Reimbursement</span>
                        </Link>
                    </div>
                    <div className="item">
                        <img src={Icon} alt=""/>
                        <span>Absensi</span>
                    </div>
                    <div className="item">
                        <img src={Icon} alt=""/>
                        {/* <Link to={`/logout`} style={{textDecoration: "none", color: "inherit"}}>
                            <span>Keluar</span>
                        </Link> */}
                        <button onClick={handleClick}>Keluar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar;