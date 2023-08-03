import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import "./dashboard.scss"


const Dashboard = () => {
    const {currentUser} = useContext(AuthContext);
    
    const [data, setData] = useState([]);
    const [dataAbsen, setDataAbsen] = useState([]);
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorAbsen, setErrorAbsen] = useState(null);

    const fetchDataReim = (id, role) => {
        const url = role === 3
        ? `/dashboard/getReim/${id}`
        : `/dashboard/getReimAdmin`;

      return makeRequest.get(url)
        .then((res) => res.data)
        .catch((error) => {
          throw error;
        });
    };

    useEffect(() => {
      fetchDataReim(currentUser.id, currentUser.role)
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          setError(error);
        });
    },[]);

    const fetchDataAbsen = (id, role) => {
        const url = role === 3
        ? `/dashboard/getAbsen/${id}`
        : `/dashboard/getAbsenAdmin`;

        return makeRequest.get(url)
          .then((res) => res.data)
          .catch((error) => {
            throw error;
          });
      };
  
      useEffect(() => {
        fetchDataAbsen(currentUser.id, currentUser.role)
          .then((data) => {
            setDataAbsen(data);
            setIsLoading(false);
          })
          .catch((error) => {
            setErrorAbsen(error);
            setIsLoading(false);
          });
      },[]);

    const disetujuiCount = data.find((item) => item.status === 'Disetujui')?.count || 0;
    const diajukanCount = data.find((item) => item.status === 'Diajukan')?.count || 0;
    const ditolakCount = data.find((item) => item.status === 'Ditolak')?.count || 0;
    const disetujuiTotal = data.find((item) => item.status === 'Disetujui')?.total_nominal || 0;
    const diajukanTotal = data.find((item) => item.status === 'Diajukan')?.total_nominal || 0;
    const ditolakTotal = data.find((item) => item.status === 'Ditolak')?.total_nominal || 0;
    
    const disetujuiTotalAbsen = dataAbsen.find((item) => item.status === 'Disetujui')?.count || 0;
    const diajukanTotalAbsen = dataAbsen.find((item) => item.status === 'Diajukan')?.count || 0;
    const ditolakTotalAbsen = dataAbsen.find((item) => item.status === 'Ditolak')?.count || 0;


    return (
        <div className="dashboard">
        {isLoading ? (
            "Loading"
          ) : (
            <>
                <div className="container">
                <span className="title">Reimbursement</span>
                <div className="cards">
                    <div className="card">
                        <div className="top">
                            Diajukan
                        </div>
                        <div className="content">
                            {diajukanCount}
                        </div>
                    </div>

                    <div className="card">
                        <div className="top">
                            Disetujui
                        </div>
                        <div className="content">
                            {disetujuiCount}
                        </div>
                    </div>

                    <div className="card">
                        <div className="top">
                            Ditolak
                        </div>
                        <div className="content">
                            {ditolakCount}
                        </div>
                    </div>
                </div>

                <div className="cards">
                    <div className="card">
                            <div className="top">
                                Total Nominal Diajukan
                            </div>
                            <div className="content">
                                {diajukanTotal}
                            </div>
                        </div>

                        <div className="card">
                            <div className="top">
                                Total Nominal Disetujui
                            </div>
                            <div className="content">
                                {disetujuiTotal}
                            </div>
                        </div>

                        <div className="card">
                            <div className="top">
                            Total Nominal Ditolak
                            </div>
                            <div className="content">
                                {ditolakTotal}
                            </div>
                        </div>
                </div>

                <span className="title">Absensi</span>
                <div className="cards">
                    <div className="card">
                        <div className="top">
                            Diajukan
                        </div>
                        <div className="content">
                            {diajukanTotalAbsen}
                        </div>
                    </div>

                    <div className="card">
                        <div className="top">
                            Diterima
                        </div>
                        <div className="content">
                            {disetujuiTotalAbsen}
                        </div>
                    </div>

                    <div className="card">
                        <div className="top">
                            Ditolak
                        </div>
                        <div className="content">
                            {ditolakTotalAbsen}
                        </div>
                    </div>
                </div>
            </div>
            </>
        )}
        </div>
    )
}
            

export default Dashboard