import React, { useState } from 'react';
import './adminTable.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';

const AdminTable = () => {

  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get('akun/getDaftarAdmin').then((res) => {
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

  const handleReset = async (e, desc) =>{
    e.preventDefault();
      try{
        await makeRequest.put("akun/resetPassword", desc)
        alert("Password Berhasil Direset dengan email akun!") 
    }catch(err){
        console.log(err)
    }
  }

  return (
    <div className="reimAbsenTable">
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
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((post, index) => (
              <React.Fragment key={index}>
                <tr>
                <td>{index + 1}</td>
                  <td>{post.email}</td>
                  <td>
                    <Link to={`/profile/${post.id}`} style={{textDecoration: "none", color: "inherit"}}>
                      <span className="name">{post.nama}</span>
                    </Link>
                  </td>
                  <td className="toBottom">
                    {/* Pass the row index to the onClick handler */}
                    <button
                      className="btnGreen"
                      onClick={(e) => handleReset(e, post)}
                    >
                      Reset Password
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
    </div>
  );
};

export default AdminTable;
