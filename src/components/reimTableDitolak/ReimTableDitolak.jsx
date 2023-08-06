import React, { useState } from 'react';
import './reimTableDitolak.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ReimTableDitolak = () => {
  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get('reims/getDitolak/').then((res) => {
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
      return makeRequest.put("/reims/reimTerima", reim)
  }, {
      onSuccess: () =>{
          queryClient.invalidateQueries(["posts"])
      },
  })

  const mutationHapus = useMutation((reim) =>{
    return makeRequest.delete("/reims/" + reim)
}, {
    onSuccess: () =>{
        queryClient.invalidateQueries(["posts"])
    },
})

  const checkReim = async (acaraId)=>{
    try{
        const res = await makeRequest.get("/reims/checkReim/" + acaraId);
        return res.data;
    }catch(err){
        console.log(err)
    }
  }


  const handleTerima = async (e, reim) => {
    e.preventDefault();

    const checkReimInfo = await checkReim(reim.acaraId);
        
    if (parseInt(checkReimInfo[0].plafon_value) !== 0) {
    
      var totalNominalInt = parseInt(checkReimInfo[0].total_nominal);
    
      if (!isNaN(totalNominalInt)) {
        if ((parseInt(reim.nominal) + totalNominalInt) > parseInt(checkReimInfo[0].plafon_value)) {
          alert("Maksimal pengajuan reimbursement pada acara ini tersisa " + (parseInt(checkReimInfo[0].plafon_value) - totalNominalInt) + " dari plafon " + parseInt(checkReimInfo[0].plafon_value));
          return;
        }
      }
    }


    mutationTerima.mutate({id: reim.id})

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
              <th>Kategori</th>
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
                      onClick={(e) => handleTerima(e, post)}
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
                            <td>Nominal:</td>
                            <td>{post.nominal}</td>
                          </tr>
                          <tr>
                            <td>Jenis Reimburse:</td>
                            <td>{post.jenis}</td>
                          </tr>
                          <tr>
                            <td>Email:</td>
                            <td>{post.email}</td>
                          </tr>
                          <tr>
                            <td>Nama Rekening:</td>
                            <td>{post.namaRek}</td>
                          </tr>
                          <tr>
                            <td>Nomor Rekening:</td>
                            <td>{post.nomor}</td>
                          </tr>
                          <tr>
                            <td>Bank:</td>
                            <td>{post.bank}</td>
                          </tr>
                          <tr>
                            <td>Tahun Magang:</td>
                            <td>{post.tahun}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td colSpan="2">
                      <img src={`${makeRequest.defaults.baseURL}invoicefile/${post.invoicePic}`} alt="" />
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

export default ReimTableDitolak;
