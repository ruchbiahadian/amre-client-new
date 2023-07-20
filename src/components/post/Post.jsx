import { Link } from "react-router-dom"
import "./post.scss"
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Comments from "../comments/Comments";
import UpdatePost from "../updatePost/UpdatePost";
import { useContext, useState } from "react";
import moment from "moment"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import { AuthContext } from "../../context/authContext";



const Post = ({post}) => {

    const {currentUser} = useContext(AuthContext)

    const [commentOpen, setCommentOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const queryClient = useQueryClient()

    const deleteMutation = useMutation((postId) =>{
        return makeRequest.delete("/posts/" + postId)
    }, {
        onSuccess: () =>{
            queryClient.invalidateQueries(["posts"])
        },
    })

    const handleDelete = () =>{
        deleteMutation.mutate(post.id)
    }
 

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={`/profile/` + post.profilePic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{textDecoration: "none", color: "inherit"}}>
                                <span className="name">{post.nama}</span>
                            </Link>
                            <span className="date">{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizOutlinedIcon onClick={()=>setMenuOpen(true)} />
                    {menuOpen && post.userId === currentUser.id && <button onClick={handleDelete}>delete</button>}
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={"./news/" + post.img} alt="" />
                </div>
                <div className="info">
                    <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon/>
                        Komentar
                    </div>
                    <div className="item" onClick={()=>setUpdateOpen(!updateOpen)}>
                        <TextsmsOutlinedIcon/>
                        Update
                    </div>
                </div>
                {commentOpen && <Comments postId={post.id} />}
                {updateOpen && <UpdatePost setUpdateOpen={setUpdateOpen} reim={post} />}
            </div>
        </div>
    )
}

export default Post