import React, { useState } from 'react';
import './akunAllTable.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const AkunAllTable = () => {

  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get('akun/getDaftarAkun').then((res) => {
      return res.data;
    })
  );
  
    const queryClient = useQueryClient()

    const mutationHapus = useMutation((reim) =>{
      return makeRequest.delete("/akun/hapusDaftarAkun/" + reim)
  }, {
      onSuccess: () =>{
          queryClient.invalidateQueries(["posts"])
      },
  })

  const handleHapus = async (e, reimId) => {
    console.log("reim" + reimId)
    e.preventDefault();
    mutationHapus.mutate(reimId)

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
                  <td>{post.jenis}</td>
                  <td>{post.tahun}</td>
                  <td className="toBottom">
                    {/* Pass the row index to the onClick handler */}
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
    </div>
  );
};

export default AkunAllTable;
