import { Link, useNavigate } from "react-router-dom"
import "./login.scss"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) =>{
        setInputs((prev) =>({ ...prev, [e.target.name]: e.target.value}));
    };
    
    const [err, setErr] = useState(null);

    const navigate = useNavigate() 

    const {login} = useContext(AuthContext);

    const handleLogin = async (e) =>{
        e.preventDefault();

        if (!inputs.email || !inputs.password) {
            alert("Isi semua form kosong!");
            return;
          }

        try{
            await login(inputs);     
            navigate("/")
        }catch(err){
            setErr(err.response.data);
        }
    };

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <span>#UnityInDiversity</span>
                </div>
                <div className="right">
                    <h1>Masuk</h1>
                    <p>Selamat datang kembali di AMRE! Semoga segala rencana anda berjalan dengan lancar!</p>
                    <form>
                        <input type="text" placeholder="Email" name="email" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}  />
                        {err && err}
                        <button onClick={handleLogin}>Masuk</button>
                    </form>
                    <p>Belum memiliki akun? Silahkan untuk <a href="/register">Daftar</a> akun terlebih dahulu</p>
                </div>
            </div>
        </div>
    )
}

export default Login