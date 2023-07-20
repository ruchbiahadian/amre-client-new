import { useContext, useState } from "react";
import "../comments/comments.scss";
import {AuthContext} from "../../context/authContext"
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import moment from "moment";

const CommentsReims = ({postId}) =>{

    const [desc, setDesc] = useState("")

    const {currentUser} = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["comments"], () =>
        makeRequest.get("/comments/reimbursement?postId=" + postId).then((res)=>{
            return res.data;
        })

    );

    const queryClient = useQueryClient()

    const mutation = useMutation((newComment) =>{
        return makeRequest.post("/comments/reimbursement", newComment)
    }, {
        onSuccess: () =>{
            queryClient.invalidateQueries(["comments"])
        },
    })

    const handleClick = async (e) =>{
        e.preventDefault();

        if (!desc) {
            alert("Isi komentar terlebih dahulu!");
            return;
          }

        mutation.mutate({desc, postId})
        setDesc("")
    }


    return (
        <div className="comments">
            <div className="write">
                <img src={`/profile/` + currentUser.profilePic} alt="" />
                <input type="text" placeholder="write a comment" 
                value={desc} onChange={e => setDesc(e.target.value)} />
                <button onClick={handleClick} >Send</button>
            </div>
            {
                error ? "Something went wrong!" 
                : isLoading ? "Loading"
                : data.map(comment=>(
                    <div className="comment" key={comment.id}>
                        <img src={`/profile/` + comment.profilePic} alt="" />
                        <div className="info">
                            <span>{comment.nama}</span>
                            <p>{comment.desc}</p>
                        </div>
                        <span className="date">{moment(comment.createdAt).fromNow()}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default CommentsReims