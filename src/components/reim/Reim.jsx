import { Link } from "react-router-dom"
import "./reim.scss"
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
import UpdateReim from "../../components/updateReim/UpdateReim"



const Reim = ({post}) => {

    const {currentUser} = useContext(AuthContext)

    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);

    const queryClient = useQueryClient()

    const deleteMutation = useMutation((postId) =>{
        return makeRequest.delete("/reims/" + postId)
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
                        <p>Tanggal: {(() => new Date(post.createdAt).toLocaleDateString('en-GB'))()}</p>
                        <p>Kategori: {post.kategori}</p>
                        <p>Nominal: {post.nominal}</p>
                        <p>Jenis: {post.jenis}</p>
                        <p>Nomor Rekening: {post.nomor}</p>
                        <p>Bank: {post.bank}</p>
                        <p>Nama Rekening: {post.namaRek}</p>
                    </div>
                    <div className="right">
                        <img src={"./invoice/" + post.invoicePic} alt="" />
                    </div>
                </div>
                <div className="info">
                    <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon/>
                        Komentar
                    </div>
                </div>
                {commentOpen && <CommentsReims postId={post.id} />}
                {updateOpen && <UpdateReim setUpdateOpen={setUpdateOpen} reim={post} />}
            </div>
        </div>
    )
}

export default Reim