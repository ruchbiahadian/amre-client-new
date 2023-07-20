import {useNavigate} from "react-router-dom";
import "./register.scss"
import { useState } from "react";
import axios from "axios";

const Register = () => {

    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        email: "", 
        nama: "", 
        jenis: "", 
        tahun: 0,
        password: ""
    });

    const handleChange = (e) =>{
        setInputs((prev) =>({ ...prev, [e.target.name]: e.target.value}));
    }; 

    const [err, setErr] = useState(null);

    const handleClick = async (e) =>{
        e.preventDefault();

        if (!inputs.email || !inputs.nama || !inputs.jenis || !inputs.tahun || !inputs.password) {
            alert("Isi semua form kosong!");
            return;
          }

        try{
            await axios.post("http://localhost:8800/api/auth/register", inputs);
            alert("Berhasil, silahkan login!");
            navigate("/login")
        }catch(err){
            setErr(err.response.data);
        }
    }   

    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <span>#UnityInDiversity</span>
                </div>
                <div className="right">
                    <h1>Daftar</h1>
                    <p>Selamat datang di AMRE! untuk mendaftar, silahkan isi form berikut ini dengan benar!</p>
                    <form>
                        <input type="text" placeholder="Email" name="email" onChange={handleChange} />
                        <input type="text" placeholder="Nama Lengkap" name="nama" onChange={handleChange} />
                        <input type="text" placeholder="Jenis Magang" name="jenis" onChange={handleChange} />
                        <input type="number" placeholder="Priode / Tahun Magang" name="tahun" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}  />
                        {err && err}
                        <button onClick={handleClick}>Daftar</button>
                    </form>
                    <p>Sudah memiliki akun? Silahkan untuk pergi ke halaman <a href="/login">Masuk</a></p>
                </div>
            </div>
        </div>
    )
}

export default Register