import { useContext, useState } from "react";
import Posts from "../../components/posts/Posts"
import Share from "../../components/Share/Share"
import "./home.scss"
import { AuthContext } from "../../context/authContext";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Home = () => {
    const {currentUser} = useContext(AuthContext);
    const [addOpen, setAddOpen] = useState(false);
    

    return (
        <div className="homee">
            <div className="container">
                {currentUser.role !== 3 &&
                    <div className="tambah" onClick={()=>setAddOpen(!addOpen)}>
                        <div className="icon">
                            <AddCircleIcon/>
                        </div>
                        Buat berita baru
                    </div>
                }
                {addOpen && currentUser.role !== 3 && (<Share setAddOpen={setAddOpen} />)}
                {addOpen && currentUser.role !== 3 && (<div className="blackBg" onClick={()=>setAddOpen(!addOpen)} />)}
                <Posts/> 
            </div>
        </div>
    )
}

export default Home