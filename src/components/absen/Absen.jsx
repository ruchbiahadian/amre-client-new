import "./absen.scss"
import { useContext, useState } from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import { AuthContext } from "../../context/authContext";
import UpdateAbsen from "../../components/updateAbsen/UpdateAbsen"
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';



const Absen = ({post}) => {

    const {currentUser} = useContext(AuthContext)

    const [updateOpen, setUpdateOpen] = useState(false);
    const [invOpen, setInvOpen] = useState(false);

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
        <div className="absenUser">
            <div className="container">
                <div className="content">
                    <div className="left">
                        <p>Status: {post.status}</p>
                        <p>Tanggal Absensi: {(() => new Date(post.createdAt).toLocaleDateString('en-GB'))()}</p>
                    </div>
                    <div className="right">
                        <p>Acara: {post.namaAcara}</p>
                        <button onClick={()=>setInvOpen(!invOpen)}>Lihat Bukti Absensi</button>
                    </div>
                </div>
                {post.status !== "Disetujui" && 
                <div className="info">
                    <div className="item" onClick={()=>setUpdateOpen(!updateOpen)}>
                        <EditOutlinedIcon/>
                        Update
                    </div>
                    <div className="item delete" onClick={handleDelete}>
                        <RemoveCircleOutlinedIcon/>
                        Delete
                    </div>
                </div>
                }
                {invOpen && <img src={`${makeRequest.defaults.baseURL}absencefile/${post.absencePic}`} alt="" />}
                {invOpen && (<div className="blackBg" onClick={()=>setInvOpen(!invOpen)} />)}
                {updateOpen && <UpdateAbsen setUpdateOpen={setUpdateOpen} reim={post} />}
                {updateOpen && (<div className="blackBg" onClick={()=>setUpdateOpen(!updateOpen)} />)}
            </div>
        </div>
    )
}

export default Absen