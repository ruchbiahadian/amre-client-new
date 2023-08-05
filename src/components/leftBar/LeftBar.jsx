import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

import ArticleIcon from '@mui/icons-material/Article';
import EventIcon from '@mui/icons-material/Event';
import PaidIcon from '@mui/icons-material/Paid';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PrintIcon from '@mui/icons-material/Print';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';

const LeftBar = () =>{

    const {currentUser, logout} = useContext(AuthContext);
    const [activeButton, setActiveButton] = useState(2);


    const { isLoading, error, data } = useQuery(["user"], () =>
        makeRequest.get("/users/find/" + currentUser.id).then((res)=>{
            return res.data;
        })
    );

    const handleClick = async (e) =>{
        e.preventDefault();

        try{
            await logout();
            await makeRequest.post("/auth/logout", {}, {withCredentials: true});
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    }

    const handleMenu = (index) => {
        setActiveButton(index)
    };

    return(
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="logo">
                        <h1>AMRE</h1>
                    </div>
                    <div className={`item ${activeButton === 1 ? 'active' : ''}`} onClick={() => handleMenu(1)}>
                        <Link to={`/profile/${currentUser.id}`} style={{textDecoration: "none", color: "inherit"} } className="link">
                            <img src={`/profile/` + currentUser.profilePic} alt="" />
                            <span className="name">Profil</span>
                        </Link>
                    </div>
                    <div className={`item ${activeButton === 2 ? 'active' : ''}`} onClick={() => handleMenu(2)}>
                        <Link to="/" style={{textDecoration: "none", color: "inherit"}} className="link">
                            <DashboardIcon />
                            <span className="name">Dashboard</span>
                        </Link>
                    </div>
                    <div className={`item ${activeButton === 3 ? 'active' : ''}`} onClick={() => handleMenu(3)}>
                        <Link to="/berita" style={{textDecoration: "none", color: "inherit"}} className="link">
                            <ArticleIcon />
                            <span className="name">Berita</span>
                        </Link>
                    </div>
                    {currentUser.role !== 3 &&
                        <div className={`item ${activeButton === 4 ? 'active' : ''}`} onClick={() => handleMenu(4)} >
                            <Link to="/acara" style={{textDecoration: "none", color: "inherit"}} className="link">
                                <EventIcon/>
                                <span>Acara</span>
                            </Link>
                        </div>
                    }
                    <div className={`item ${activeButton === 5 ? 'active' : ''}`} onClick={() => handleMenu(5)}>
                        <Link to="/reimbursement" style={{textDecoration: "none", color: "inherit"}} className="link">
                            <PaidIcon/>
                            <span>Reimbursement</span>
                        </Link>
                    </div>
                    <div className={`item ${activeButton === 6 ? 'active' : ''}`} onClick={() => handleMenu(6)}>
                        <Link to="/absensi" style={{textDecoration: "none", color: "inherit"}} className="link">
                            <LibraryAddCheckIcon/>
                            <span>Absensi</span>
                        </Link>
                    </div>
                    {currentUser.role !== 3 &&
                        <div className={`item ${activeButton === 7 ? 'active' : ''}`} onClick={() => handleMenu(7)}>
                            <Link to="/laporan" style={{textDecoration: "none", color: "inherit"}} className="link">
                                <PrintIcon/>
                                <span>Laporan</span>
                            </Link>
                        </div>
                    }
                    {currentUser.role !== 3 &&
                        <div className={`item ${activeButton === 8 ? 'active' : ''}`} onClick={() => handleMenu(8)}>
                            <Link to="/invoiceComparison" style={{textDecoration: "none", color: "inherit"}} className="link">
                                <ReceiptIcon/>
                                <span>Invoice Comparison</span>
                            </Link>
                        </div>
                    }
                    {currentUser.role !== 3 &&
                        <div className={`item ${activeButton === 9 ? 'active' : ''}`} onClick={() => handleMenu(9)}>
                            <Link to="/akun" style={{textDecoration: "none", color: "inherit"}} className="link">
                                <PeopleIcon/>
                                <span>Kelola Akun</span>
                            </Link>
                        </div>
                    }
                    <div className={`item ${activeButton === 10 ? 'active' : ''}`} onClick={() => handleMenu(10)} >
                        <Link onClick={handleClick} style={{textDecoration: "none", color: "inherit"}} className="link">
                            <LogoutIcon/>
                            <span>Keluar</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar;