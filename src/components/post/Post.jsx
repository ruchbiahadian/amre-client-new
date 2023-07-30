import { Link } from "react-router-dom"
import "./post.scss"
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
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
                    {post.userId === currentUser.id &&  <RemoveCircleOutlinedIcon className="clearIcon" onClick={handleDelete} />}
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={"./news/" + post.img} alt="" />
                </div>
                <div className="info">
                    <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
                        <NotesOutlinedIcon/>
                        Komentar
                    </div>
                    {post.userId === currentUser.id &&
                        <div className="item" onClick={()=>setUpdateOpen(!updateOpen)}>
                            <EditOutlinedIcon/>
                            Update
                        </div>
                    }
                </div>
                {commentOpen && <Comments postId={post.id} />}
                {post.userId === currentUser.id && updateOpen && <UpdatePost setUpdateOpen={setUpdateOpen} reim={post} />}
                {updateOpen && (<div className="blackBg" onClick={()=>setUpdateOpen(!updateOpen)} />)}
            </div>
        </div>
    )
}

export default Post