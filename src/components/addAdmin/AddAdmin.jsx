import "./addAdmin.scss";
import { useContext, useEffect, useRef, useState } from "react";
import {AuthContext} from "../../context/authContext";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";

const AddAdmin = ({setAddOpen}) =>{

    const {currentUser} = useContext(AuthContext)

    const [texts, setTexts] = useState({
        email: "", 
        nama: "", 
        password: "", 
        password2: ""
    });
    
  const formRef = useRef(null);

  const resetForm = () => {
    formRef.current.reset();
  };

    const handleChange = (e) =>{
        setTexts((prev) =>({ ...prev, [e.target.name]: e.target.value}));
    }; 
    
    const queryClient = useQueryClient()

    const mutation = useMutation((newPost) =>{
        return makeRequest.post("/akun/tambahAdmin", newPost)
    }, 
    
    {
        onError: (error) =>{
            let errorMessage = "Terjadi kesalahan.";

            if (error.response && error.response.data) {
              const responseData = error.response.data;
              if (responseData.message) {
                errorMessage = responseData.message;
              } else if (responseData.error) {
                errorMessage = responseData.error;
              }
            }

            alert(errorMessage);
        },
    },

    {
        onSuccess: () =>{
            queryClient.invalidateQueries(["posts"]);
        },
    })

    const handleClick = async (e) =>{
        e.preventDefault();


        if (!texts.email || !texts.nama || !texts.password || !texts.password2) {
            alert("Isi semua form kosong!");
          return;
        }

        if(texts.password !== texts.password2){
            alert("Konfirmasi password salah!")
            return;
        }
            

        mutation.mutate({...texts})

        setAddOpen(false)
        setTexts("")
        resetForm();
    }

    return (
        <div className="addAdmin">
          <div className="container">
                <form ref={formRef}>
                  <div className="item">
                        <span>Email</span>
                        <input type="text" name="email" placeholder="Masukan Email" onChange={handleChange} />
                  </div>
                  <div className="item">
                        <span>Nama</span>
                        <input type="text" name="nama" placeholder="Masukan Nama" onChange={handleChange} />
                  </div>
                  <div className="item">
                        <span>Password</span>
                        <input type="password" name="password" placeholder="Masukan Password" onChange={handleChange} />
                  </div>
                  <div className="item">
                        <span>Konfirmasi Password</span>
                        <input type="password" name="password2" placeholder="Konfirmasi Password" onChange={handleChange} />
                  </div>
                  <button onClick={handleClick}>Tambah Admin</button>
                </form>
          </div>
        </div>

    )
}

export default AddAdmin