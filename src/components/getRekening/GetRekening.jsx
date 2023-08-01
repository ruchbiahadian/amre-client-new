import { useContext, useEffect, useRef, useState } from "react"
import "./getRekening.scss"
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

const GetRekening = ({id}) =>{
    
    const authContext = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = (userId) => {
      const url = `/rekening/find/${userId}`;
    
      return makeRequest.get(url)
        .then((res) => res.data)
        .catch((error) => {
          throw error;
        });
    };

    useEffect(() => {
      fetchData(id)
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, [id]);
    
    return (
      <div className="getRekening">
        {isLoading ? (
          "Loading"
        ) : (
          <>
            <div className="container">
                  <form>
                    <div className="item">
                          <span>Nomor Rekening</span>
                          <input type="text" value={data[0].nomor} readOnly />
                    </div>
                    <div className="item">
                          <span>Bank</span>
                          <input type="text" value={data[0].bank}  readOnly />
                    </div>
                    <div className="item">
                          <span>Nama Rekening</span>
                          <input type="text" value={data[0].namaRek}  readOnly />
                    </div>
                  </form>
            </div>
          </> )}
        </div> 
      )   
  }
export default GetRekening

