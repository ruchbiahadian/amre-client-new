import React, { useState } from 'react';
import './acaraTable.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import UpdateAcara from "../updateAcara/UpdateAcara";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import addAcara from "../addAcara/AddAcara";
import AddAcara from '../addAcara/AddAcara';

const AcaraTable = () => {

  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get('acara/').then((res) => {
      return res.data;
    })
  );

  const handleUpdateClick = (post) => {
    setSelectedPost(post);
    setUpdateOpen(true);
  };
  
  const queryClient = useQueryClient()

  const mutationHapus = useMutation((reim) =>{
    return makeRequest.delete("/acara/hapus/" + reim)
}, {
    onSuccess: () =>{
        queryClient.invalidateQueries(["posts"])
    },
})

const handleHapus = async (e, reimId) => {
  e.preventDefault();
  mutationHapus.mutate(reimId)

}
  

  return (
    <div className="responsive-table">
      <AddAcara/>
      {error ? (
        <p>Something went wrong!</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Acara</th>
              <th>Reimbursement</th>
              <th>Plafon</th>
              <th>Absensi</th>
              <th>Maksimal Absen</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((post, index) => (
              <React.Fragment key={index}>
                <tr>
                <td>{index + 1}</td>
                  <td>{post.namaAcara}</td>
                  <td>{post.reimbursement_status}</td>
                  <td>{post.plafon}</td>
                  <td>{post.absensi_status}</td>
                  <td>{(() => new Date(post.maxAbsen).toLocaleDateString('en-GB'))()}</td>
                  
                  <td className="toBottom">
                    {/* Pass the row index to the onClick handler */}
                    <button
                      className="btnBlue"
                      onClick={()=>handleUpdateClick(post)}
                    >
                      Update
                    </button>
                    <button
                      className="btnRed"
                      onClick={(e) => handleHapus(e, post.id)}
                    >
                      <DeleteOutlineIcon/>
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
        {updateOpen && selectedPost && <UpdateAcara setUpdateOpen={setUpdateOpen} reim={selectedPost} />}
    </div>
  );
};

export default AcaraTable;
