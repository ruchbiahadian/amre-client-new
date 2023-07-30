import "./profile.scss"
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import UpdatePswd from "../../components/updatePswd/UpdatePswd"




const Profile = () => {

    // Profile update
    const  [openUpdateProfile, setOpenUpdateProfile] = useState(false)
    const  [openUpdatePassword, setOpenUpdatePassword] = useState(false)

    // Get
    const {currentUser} = useContext(AuthContext);

    const userId = parseInt(useLocation().pathname.split("/")[2]);

    const { isLoading, error, data } = useQuery(["user"], () =>
        makeRequest.get("/users/find/" + userId).then((res)=>{
            return res.data;
        })
    );

    // Update
    const [texts, setTexts] = useState({
        email: "",
        nama: "",
        noTelp: "",
        instansi: "",
        jenis: "",
        tahun: "",
        domisili: "",
        nomor: "",
        bank: "",
        namaRek: ""
    });

    const queryClient = useQueryClient()

    const mutation = useMutation((mutationTexts) =>{
        return makeRequest.put("/users/updateUserTexts", mutationTexts)
    }, {
        onSuccess: () =>{
            queryClient.invalidateQueries(["user"])
        },
    })

    const handleChange = (e) =>{
        setTexts((prev) =>({ ...prev, [e.target.name]: e.target.value}));
    }; 

    const handleClick = async (e) =>{
        e.preventDefault();

        texts.email = texts.email ? texts.email : data.email;
        texts.nama = texts.nama ? texts.nama : data.nama;
        texts.noTelp = texts.noTelp ? texts.noTelp : data.noTelp;
        texts.instansi = texts.instansi ? texts.instansi : data.instansi;
        texts.jenis = texts.jenis ? texts.jenis : data.jenis;
        texts.tahun = texts.tahun ? texts.tahun : data.tahun;
        texts.domisili = texts.domisili ? texts.domisili : data.domisili;
        texts.nomor = texts.nomor ? texts.nomor : data.nomor;
        texts.bank = texts.bank ? texts.bank : data.bank;
        texts.namaRek = texts.namaRek ? texts.namaRek : data.namaRek;

        
        mutation.mutate({...texts})
 
        window.location.reload();


    }
    
    return (
        <div className="profile">
          {isLoading ? (
            "Loading"
          ) : (
            <>
              <div className="container">
                <div className="info">
                  <div className="image">
                    <img
                      src={"/profile/" + data.profilePic}
                      alt=""
                      className="profilePic"
                    />
                    <div className="buttonGroup">
                      <button onClick={() => setOpenUpdateProfile(true)}>
                        Ubah Gambar
                      </button>
                      <button onClick={() => setOpenUpdatePassword(true)}>
                        Ubah Password
                      </button>
                    </div>
                  </div>
                  <div className="boxTitle">
                    <span className="title">Email</span>
                    <input
                      type="text"
                      name="email"
                      placeholder={data.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="boxTitle">
                    <span className="title">Nama</span>
                    <input
                      type="text"
                      name="nama"
                      placeholder={data.nama}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="boxTitle">
                    <span className="title">Nomor</span>
                    <input
                      type="text"
                      name="noTelp"
                      placeholder={data.noTelp}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="boxTitle">
                    <span className="title">Instansi</span>
                    <input
                      type="text"
                      name="instansi"
                      placeholder={data.instansi}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="boxTitle">
                    <span className="title">Jenis Magang</span>
                    <input
                      type="text"
                      name="data"
                      placeholder={data.jenis}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="boxTitle">
                    <span className="title">Tahun Magang</span>
                    <input
                      type="number"
                      name="tahun"
                      placeholder={data.tahun}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="boxTitle">
                    <span className="title">Alamat Domisili</span>
                    <input
                      type="text"
                      name="domisili"
                      placeholder={data.domisili}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="boxTitle">
                    <span className="title">Nomor Rekening</span>
                    <input
                      type="text"
                      name="nomor"
                      placeholder={data.nomor}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="boxTitle">
                    <span className="title">Nama Bank</span>
                    <input
                      type="text"
                      name="bank"
                      placeholder={data.bank}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="boxTitle">
                    <span className="title">Nama Rekening</span>
                    <input
                      type="text"
                      name="namaRek"
                      placeholder={data.namaRek}
                      onChange={handleChange}
                    />
                  </div>
                  <button className="updateButton" onClick={handleClick}>Update</button>
                </div>
              </div>
            </>
          )}
          {openUpdateProfile && <Update setOpenUpdate={setOpenUpdateProfile} user={data} />}
          {openUpdatePassword && <UpdatePswd setOpenUpdate={setOpenUpdatePassword} user={data} />}
          {(openUpdateProfile) && (<div className="blackBg" onClick={()=>setOpenUpdateProfile(!openUpdateProfile)} />)}
          {(openUpdatePassword) && (<div className="blackBg" onClick={()=>setOpenUpdatePassword(!openUpdatePassword)} />)}
        </div>

    )
}

export default Profile