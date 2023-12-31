import React, { useEffect, useState } from 'react';
import './laporanTable.scss';
import PdfGenerator from "../pdfGenerator/PdfGenerator";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import UpdateAcara from "../updateAcara/UpdateAcara";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const LaporanTable = ({acaraId}) => {
  const [generatePDF, setGeneratePDF] = useState(false);

  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorData, setErrorData] = useState(null);

  const fetchTotal = (acaraId) => {
    const url = `laporan/total/${acaraId}`;

  return makeRequest.get(url)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const fetchData = (acaraId) => {
  const url = `laporan/reim/${acaraId}`;

return makeRequest.get(url)
  .then((res) => res.data)
  .catch((error) => {
    throw error;
  });
};

useEffect(() => {
  fetchTotal(acaraId)
    .then((data) => {
      setTotal(data[0].total);
    })
    .catch((error) => {
      setError(error);
    });
},[]);

useEffect(() => {
  fetchData(acaraId)
    .then((data) => {
      setData(data);
      setIsLoading(false);
    })
    .catch((error) => {
      setErrorData(error);
      setIsLoading(false);
    });
},[]);

   const togglePDFGeneration = () => {
    setGeneratePDF(!generatePDF);
  };
  
  return (
    <div className="reimAbsenTable">
      {data.length > 0 ? 
      
      <div className="unduhLink">
          <button onClick={togglePDFGeneration}>Unduh Laporan</button>
          {generatePDF ? <PdfGenerator data={data} total={total?total:0} /> : null}
      </div>
      
      : null}
      
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
              <th>Total</th>
              <th>Acara</th>
              <th>Nomor Rekening</th>
              <th>Bank</th>
              <th style={{textAlign: "left"}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((post, index) => (
              <React.Fragment key={index}>
                <tr>
                <td>{index + 1}</td>
                  <td>{post.nama}</td>
                  <td>{post.total_nominal}</td>
                  <td>{post.namaAcara}</td>
                  <td>{post.nomor}</td>
                  <td>{post.bank}</td>
                  <td>{post.rm_status}</td>
                </tr>
              </React.Fragment>
            ))}
            <tr>
              <td colSpan={7} style={{textAlign:"center"}}>Total Nominal: {total?total:0}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LaporanTable;
