import { useContext } from "react";
import Posts from "../../components/posts/Posts"
import Share from "../../components/Share/Share"
import "./home.scss"
import { AuthContext } from "../../context/authContext";

const Home = () => {
    const {currentUser} = useContext(AuthContext);

    return (
        <div className="home">
            {currentUser.role === 1 && (<Share/>)}
            <Posts/> 
        </div>
    )
}

export default Home