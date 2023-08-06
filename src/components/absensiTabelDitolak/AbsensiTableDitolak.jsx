import React, { useState } from 'react';
import './absensiTableDitolak.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const AbsensiTableDitolak = () => {
  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get('absensi/getDitolak/').then((res) => {
      return res.data;
    })
  );

  // Create a state to keep track of selected rows
  const [selectedRows, setSelectedRows] = useState([]);

  const handleButtonClick = (index) => {
    // Toggle the child row state for the clicked row
    setSelectedRows((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const queryClient = useQueryClient()

  const mutationTerima = useMutation((reim) =>{
      return makeRequest.put("/absensi/absensiTerima", reim)
  }, {
      onSuccess: () =>{
          queryClient.invalidateQueries(["posts"])
      },
  })

const mutationHapus = useMutation((reim) =>{
  return makeRequest.delete("/absensi/" + reim)
}, {
  onSuccess: () =>{
      queryClient.invalidateQueries(["posts"])
  },
})


  const handleTerima = async (e, reimId) => {
    e.preventDefault();
    mutationTerima.mutate({id: reimId})

}


const handleHapus = async (e, reimId) => {
  e.preventDefault();
  mutationHapus.mutate(reimId)

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
              <th>Tanggal</th>
              <th>Nama</th>
              <th>Acara</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((post, index) => (
              <React.Fragment key={index}>
                <tr>
                <td>{index + 1}</td>
                  <td>
                    {(() => new Date(post.createdAt).toLocaleDateString('en-GB'))()}
                  </td>
                  <td>{post.nama}</td>
                  <td>{post.namaAcara}</td>
                  <td className="toBottom">
                    {/* Pass the row index to the onClick handler */}
                    <button
                      className="btnGreen"
                      onClick={(e) => handleTerima(e, post.id)}
                    >
                      Terima
                    </button>
                    <button
                      className="btnBlue"
                      onClick={() => handleButtonClick(index)}
                    >
                      <KeyboardArrowDownIcon/>
                    </button>
                    <button
                      className="btnRed"
                      onClick={(e) => handleHapus(e, post.id)}
                    >
                      <DeleteOutlineIcon/>
                    </button>
                  </td>
                </tr>
                {/* Use the selectedRows state to conditionally render the child row */}
                {selectedRows[index] && (
                  <tr className="child-row">
                    <td colSpan="3">
                      <table>
                        <tbody>
                          <tr>
                              <td>Email:</td>
                              <td>{post.email}</td>
                            </tr>
                            <tr>
                              <td>No Telepon:</td>
                              <td>{post.noTelp}</td>
                            </tr>
                            <tr>
                              <td>Universitas:</td>
                              <td>{post.instansi}</td>
                            </tr>
                            <tr>
                              <td>Jenis Magang:</td>
                              <td>{post.jenis}</td>
                            </tr>
                            <tr>
                              <td>Tahun Magang:</td>
                              <td>{post.tahun}</td>
                            </tr>
                        </tbody>
                      </table>
                    </td>
                    <td colSpan="2">
                      <img src={`${makeRequest.defaults.baseURL}absencefile/${post.absencePic}`} alt="" />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AbsensiTableDitolak;
