import { Link } from "react-router-dom"
import "./absen.scss"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Comments from "../comments/Comments";
import CommentsReims from "../commentsReims/CommentsReims";
import { useContext, useState } from "react";
import moment from "moment"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import { AuthContext } from "../../context/authContext";
import UpdateAbsen from "../../components/updateAbsen/UpdateAbsen"



const Absen = ({post}) => {

    const {currentUser} = useContext(AuthContext)

    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);

    const queryClient = useQueryClient()

    const deleteMutation = useMutation((postId) =>{
        return makeRequest.delete("/absensi/" + postId)
    }, {
        onSuccess: () =>{
            queryClient.invalidateQueries(["posts"]);
        },
    })

    const handleDelete = () =>{
        deleteMutation.mutate(post.id)
    }
 
    return (
        <div className="invoice">
            <div className="container">
                <div className="user">
                    <button onClick={()=>setUpdateOpen(!updateOpen)}>update</button>
                    <button onClick={handleDelete}>delete</button>
                </div>
                <div className="content">
                    <div className="left">
                        <p>Status: {post.status}</p>
                        <p>Tanggal Absensi: {(() => new Date(post.createdAt).toLocaleDateString('en-GB'))()}</p>
                        <p>Acara: {post.kategori}</p>
                    </div>
                    <div className="right">
                        <img src={"./absence/" + post.absencePic} alt="" />
                    </div>
                </div>
                <div className="info">
                    <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon/>
                        Komentar
                    </div>
                </div>
                {commentOpen && <CommentsReims postId={post.id} />}
                {updateOpen && <UpdateAbsen setUpdateOpen={setUpdateOpen} reim={post} />}
            </div>
        </div>
    )
}

export default Absen