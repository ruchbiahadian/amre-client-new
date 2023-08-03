import React, { useState } from 'react';
import './laporanTable.scss';
import PdfGenerator from "../pdfGenerator/PdfGenerator";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import UpdateAcara from "../updateAcara/UpdateAcara";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const LaporanTable = ({acaraId}) => {
  const [generatePDF, setGeneratePDF] = useState(false);

  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get('laporan/' + acaraId).then((res) => {
      return res.data;
    })
  );

   const togglePDFGeneration = () => {
    setGeneratePDF(!generatePDF);
  };
  
  return (
    <div className="reimAbsenTable">
      <button onClick={togglePDFGeneration}>Generate PDF</button>
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
          </tbody>
        </table>
      )}
        {generatePDF ? <PdfGenerator data={data} /> : null}
    </div>
  );
};

export default LaporanTable;
