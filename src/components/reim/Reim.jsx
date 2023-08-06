import "./reim.scss"
import { useContext, useState } from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import { AuthContext } from "../../context/authContext";
import UpdateReim from "../../components/updateReim/UpdateReim"
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';



const Reim = ({post}) => {

    const {currentUser} = useContext(AuthContext)

    const [invOpen, setInvOpen] = useState(false);
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
        <div className="reim">
            <div className="container">
                <div className="content">
                    <div className="left">
                        <p>Status: {post.status}</p>
                        <p>Tanggal: {(() => new Date(post.createdAt).toLocaleDateString('en-GB'))()}</p>
                        <p>Kategori / Acara: {post.namaAcara}</p>
                        <p>Nominal: {post.nominal}</p>
                        <p>Jenis: {post.jenis}</p>
                    </div>
                    <div className="right">
                        <p>Nomor Rekening: {post.nomor}</p>
                        <p>Bank: {post.bank}</p>
                        <p>Nama Rekening: {post.namaRek}</p>
                        <button onClick={()=>setInvOpen(!invOpen)}>Lihat Invoice</button>
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
                {invOpen && <img src={`${makeRequest.defaults.baseURL}invoicefile/${post.invoicePic}`} alt="" />}
                {invOpen && (<div className="blackBg" onClick={()=>setInvOpen(!invOpen)} />)}
                {updateOpen && <UpdateReim setUpdateOpen={setUpdateOpen} reim={post} />}
                {updateOpen && (<div className="blackBg" onClick={()=>setUpdateOpen(!updateOpen)} />)}
            </div>
        </div>
    )
}

export default Reim