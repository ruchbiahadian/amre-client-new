import "./profile.scss"
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import UpdatePswd from "../../components/updatePswd/UpdatePswd"
import GetRekening from "../../components/getRekening/GetRekening";




const Profile = () => {

    // Profile update
    const  [openUpdateProfile, setOpenUpdateProfile] = useState(false)
    const  [openUpdatePassword, setOpenUpdatePassword] = useState(false)
    const  [openGetRekening, setOpenGetRekening] = useState(false)

    // Get
    const {currentUser} = useContext(AuthContext);

    // const userId = parseInt(useLocation().pathname.split("/")[2]);
    const { id: userId } = useParams();

    // const { isLoading, error, data } = useQuery(
    //   ["user"],
    //   () =>
    //     makeRequest
    //       .get(currentUser.role === 3 ? "/users/find/" + userId : "/users/find/admin/" + userId)
    //       .then((res) => res.data)
    // ); 

    const url = currentUser.role === 3
    ? `/users/find/${userId}`
    : `/users/find/admin/${userId}`;

    const { isLoading, error, data } = useQuery(['user', currentUser, userId], () =>
      makeRequest.get(url).then((res) => res.data)
    );

    // Update
    const [texts, setTexts] = useState({
        email: data.email,
        nama: data.nama,
        noTelp: data.noTelp,
        instansi: data.instansi,
        jenis: data.jenis,
        tahun: data.tahun,
        domisili: data.domisili,
        nomor: data.nomor,
        bank: data.bank,
        namaRek: data.namaRek,
        role: currentUser.role,
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
        
        mutation.mutate({...texts})
 
        alert("Data berhasil diubah")
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
                      src={`${makeRequest.defaults.baseURL}profilefile/${data.profilePic}`}
                      alt=""
                      className="profilePic"
                    />
                    {currentUser.id == userId &&
                      <div className="buttonGroup">
                          <button onClick={() => setOpenUpdateProfile(true)}>
                            Ubah Gambar
                          </button>
                          <button onClick={() => setOpenUpdatePassword(true)}>
                            Ubah Password
                          </button>
                      </div>
                    }
                    {data.role === 3 && currentUser.role !== 3 &&
                      <div className="buttonGroup">
                          <button onClick={() => setOpenGetRekening(true)}>
                            Informasi rekening
                          </button>
                      </div>
                    }

                    {openGetRekening && <GetRekening id={data.id} />}
                    {openGetRekening && (<div className="blackBg" onClick={()=>setOpenGetRekening(!openGetRekening)} />)}
                  </div>
                  <div className="boxTitle">
                    <span className="title">Email</span>
                    <input
                      type="text"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="boxTitle">
                    <span className="title">Nama</span>
                    <input
                      type="text"
                      name="nama"
                      value={data.nama}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="boxTitle">
                    <span className="title">Nomor Telepon</span>
                    <input
                      type="text"
                      name="noTelp"
                      value={data.noTelp}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="boxTitle">
                    <span className="title">Instansi</span>
                    <input
                      type="text"
                      name="instansi"
                      value={data.instansi}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="boxTitle">
                    {data.role === 3 && <span className="title">Jenis Magang</span>}
                    {data.role !== 3 && <span className="title">Divisi</span>}
                    <input
                      type="text"
                      name="data"
                      value={data.jenis}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="boxTitle">
                  {data.role === 3 && <span className="title">Tahun Magang</span>}
                  {data.role !== 3 && <span className="title">Tahun Masuk Perusahaan</span>}
                    <input
                      type="number"
                      name="tahun"
                      value={data.tahun}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="boxTitle">
                    <span className="title">Alamat Domisili</span>
                    <input
                      type="text"
                      name="domisili"
                      value={data.domisili}
                      onChange={handleChange}
                    />
                  </div>
                  {data.role === 3 && currentUser.role === 3 &&
                    <div className="boxTitle">
                      <span className="title">Nomor Rekening</span>
                      <input
                        type="text"
                        name="nomor"
                        value={data.nomor}
                        onChange={handleChange}
                      />
                    </div>
                  }

                  {data.role === 3 && currentUser.role === 3 &&
                    <div className="boxTitle">
                      <span className="title">Nama Bank</span>
                      <input
                        type="text"
                        name="bank"
                        value={data.bank}
                        onChange={handleChange}
                      />
                    </div>
                  }
                  {data.role === 3 && currentUser.role === 3 &&
                    <div className="boxTitle">
                        <span className="title">Nama Rekening</span>
                        <input
                          type="text"
                          name="namaRek"
                          value={data.namaRek}
                          onChange={handleChange}
                        />
                    </div>
                  }
                  {currentUser.id == userId &&
                      <button className="updateButton" onClick={handleClick}>Update</button>
                  }
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