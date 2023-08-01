import { useContext, useRef, useState } from "react"
import "./updatePswd.scss"
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

const UpdatePswd = ({setOpenUpdate, user}) =>{
    
    const authContext = useContext(AuthContext);

    const formRef = useRef(null);

    const resetForm = () => {
      formRef.current.reset();
    };
    
    const [desc, setDesc] = useState({
        passwordLama: "", 
        passwordBaru: "", 
        passwordBaru2: "",
        id: user.id
    });

    const handleChange = (e) =>{
        setDesc((prev) =>({ ...prev, [e.target.name]: e.target.value}));
    }; 

    const queryClient = useQueryClient()

    const mutationUpdate = useMutation((data) =>{
        return makeRequest.put("/users/updateUserPassword", data)
    }, {
        onSuccess: () =>{
            queryClient.invalidateQueries(["posts"])
        },
    })

    const login = async (inputs) => {
        const res = await makeRequest.put(
          "users/updateUserPassword",
          inputs,
          {
            withCredentials: true,
          }
        );
      };
    

    const handleClick = async (e) =>{
        e.preventDefault();

        if (!desc.passwordLama || !desc.passwordBaru || !desc.passwordBaru2) {
            alert("Isi semua form kosong!");
            return;
          }

        if(desc.passwordBaru !== desc.passwordBaru2){
            alert("Konfirmasi password salah!");
            return;
        }
        
        try{
            await login(desc);    
            alert("Password Berhasil diganti") 
            setOpenUpdate(false);
        }catch(err){
            alert(err.response.data);
        }

        resetForm();
    }
    

return (
        <div className="updateAcara">
          <div className="container">
                <form ref={formRef}>
                  <div className="item">
                        <span>Password Lama</span>
                        <input type="password" name="passwordLama" placeholder="Masukan Password Lama" onChange={handleChange} />
                  </div>
                  <div className="item">
                        <span>Password Baru</span>
                        <input type="password" name="passwordBaru" placeholder="Masukan Baru" onChange={handleChange} />
                  </div>
                  <div className="item">
                        <span>Konfirmasi Password Baru</span>
                        <input type="password" name="passwordBaru2" placeholder="Konfirmasi Password Baru" onChange={handleChange} />
                  </div>
                  <button onClick={handleClick}>Update</button>
                </form>
          </div>
        </div>

    )

    
}

export default UpdatePswd