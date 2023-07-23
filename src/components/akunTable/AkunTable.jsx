import React, { useState } from 'react';
import './akunTable.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import UpdateAcara from "../updateAcara/UpdateAcara";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const AkunTable = () => {

  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get('akun/getPendaftar').then((res) => {
      return res.data;
    })
  );
  
    const queryClient = useQueryClient()

    const mutationHapus = useMutation((reim) =>{
      return makeRequest.delete("/akun/hapusPendaftar/" + reim)
  }, {
      onSuccess: () =>{
          queryClient.invalidateQueries(["posts"])
      },
  })

  const mutationTerima = useMutation((reim) =>{
    return makeRequest.post("/akun/terimaPendaftar", reim)
  }, {
    onSuccess: () =>{
        queryClient.invalidateQueries(["posts"])
    },
  })

  const handleHapus = async (e, reimId) => {
    e.preventDefault();
    mutationHapus.mutate(reimId)

  }

  const handleTerima = async (e, reim) => {
    e.preventDefault();
    mutationTerima.mutate(reim)
    handleHapus(e, reim.id)
  }
  

  return (
    <div className="responsive-table">
      {error ? (
        <p>Something went wrong!</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Email</th>
              <th>Nama</th>
              <th>Jenis Magang</th>
              <th>Tahun Magang</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((post, index) => (
              <React.Fragment key={index}>
                <tr>
                <td>{index + 1}</td>
                  <td>{post.email}</td>
                  <td>{post.nama}</td>
                  <td>{post.jenisMagang}</td>
                  <td>{post.tahunMagang}</td>
                  <td className="toBottom">
                    {/* Pass the row index to the onClick handler */}
                    <button
                      className="btnGreen"
                      onClick={(e) => handleTerima(e, post)}
                    >
                      Terima
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

export default AkunTable;
