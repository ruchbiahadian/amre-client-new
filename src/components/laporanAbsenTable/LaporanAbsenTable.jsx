import React, { useEffect, useState } from 'react';
import './laporanAbsenTable.scss';
import PdfGeneratorAbsen from "../pdfGenerator/PdfGeneratorAbsen";
import { makeRequest } from '../../axios';

const LaporanAbsenTable = ({acaraId}) => {
  const [generatePDF, setGeneratePDF] = useState(false);

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchData = (acaraId) => {
  const url = `laporan/absen/${acaraId}`;

return makeRequest.get(url)
  .then((res) => res.data)
  .catch((error) => {
    throw error;
  });
};

useEffect(() => {
  fetchData(acaraId)
    .then((data) => {
      setData(data);
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
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
          {generatePDF ? <PdfGeneratorAbsen data={data}/> : null}
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
              <th>Tanggal Absensi</th>
              <th>Email</th>
              <th>Nama</th>
              <th>Acara</th>
              <th style={{textAlign: "left"}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((post, index) => (
              <React.Fragment key={index}>
                <tr>
                <td>{index + 1}</td>
                  <td>{(() => new Date(post.createdAt).toLocaleDateString('en-GB'))()}</td>
                  <td>{post.email}</td>
                  <td>{post.nama}</td>
                  <td>{post.namaAcara}</td>
                  <td>{post.status}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LaporanAbsenTable;
