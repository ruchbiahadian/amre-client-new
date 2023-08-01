import React, { useContext, useState } from 'react';
import './jenisReim.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AuthContext } from "../../context/authContext";

const JenisReim = () => {
  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get('/jenisReims').then((res) => {
      return res.data;
    })
  );

  const {currentUser} = useContext(AuthContext);
  const [texts, setTexts] = useState();
  const [addOpen, setAddOpen] = useState(false);

  const queryClient = useQueryClient()
  
  const mutationHapus = useMutation((reim) =>{
      return makeRequest.delete("/jenisReims/hapus/" + reim)
  }, {
      onSuccess: () =>{
          queryClient.invalidateQueries(["posts"])
      },
  })

  const mutation = useMutation((newPost) =>{
    return makeRequest.post("/jenisReims/tambah", newPost)
  }, {
      onSuccess: () =>{
          queryClient.invalidateQueries(["posts"])
      },onError: (error) => {
        if (error.response && error.response.status === 409) {
            alert("Jenis Reimbursement Sudah Tersedia!")
        }}
  })

  const handleHapus = async (e, reimId) => {
      e.preventDefault();
      mutationHapus.mutate(reimId)

  }

  const handleClick = async (e) =>{
      e.preventDefault();

      if (!texts) {
          alert("Form Kosong!");
          return;
        }
      mutation.mutate({texts})

      setTexts("")
  }


  return (
    <div>

      <div className="tambah" onClick={()=>setAddOpen(!addOpen)}>
          <div className="icon">
              <AddCircleIcon/>
          </div>
          Tambah Jenis Reimbursement
       </div>

       {addOpen && currentUser.role !== 3 && 
       <div className="input">
          <input type="text" placeholder='Tambah Jenis Reimbursement' onChange={(e) => setTexts(e.target.value)} />
          <button onClick={handleClick}>Tambah</button>
        </div> 
       }
      
      <div className='reimAbsenTable'>
        {error ? (
          <p>Something went wrong!</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((post, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{post.namaJenis}</td>
                    <td className="toBottom">
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
    </div>
  );
};

export default JenisReim;
