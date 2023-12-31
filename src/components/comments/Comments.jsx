import { useContext, useState } from "react";
import "./comments.scss"
import {AuthContext} from "../../context/authContext"
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({postId}) =>{

    const [desc, setDesc] = useState("")

    const {currentUser} = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["comments"], () =>
        makeRequest.get("/comments?postId=" + postId).then((res)=>{
            return res.data;
        })

    );

    const queryClient = useQueryClient()

    const mutation = useMutation((newComment) =>{
        return makeRequest.post("/comments", newComment)
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
                <img src={`${makeRequest.defaults.baseURL}profilefile/${currentUser.profilePic}`} alt="" />
                <input type="text" placeholder="Tulis Komentar" 
                value={desc} onChange={e => setDesc(e.target.value)} />
                <button onClick={handleClick} >Kirim</button>
            </div>
            {
                error ? "Something went wrong!" 
                : isLoading ? "Loading"
                : data.map(comment=>(
                    <div className="comment" key={comment.id}>
                        <img src={`${makeRequest.defaults.baseURL}profilefile/${comment.profilePic}`} alt="" />
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

export default Comments