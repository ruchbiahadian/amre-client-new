import "./style.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Reimbursement from "./pages/reimbursement/Reimbursement";
import Absensi from "./pages/absensi/Absensi";
import Acara from "./pages/acara/Acara";
import Akun from "./pages/akun/Akun";
import Laporan from "./pages/laporan/Laporan";
import Leftbar from "./components/leftBar/LeftBar";
import {
  createBrowserRouter,
  RouterProvider,
  Router,
  Outlet,
  Navigate}
  from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

function App() {

  const {currentUser} = useContext(AuthContext);

  const  queryClient = new QueryClient();

  const Layout = () =>{
    return(
      <QueryClientProvider client={queryClient}>
          <div>
            {/* <Navbar/> */}
            <div style={{display: "flex"}}>
              <Leftbar/>
              <div style={{flex: 6}}>
                <Outlet/>
              </div>
            </div> 
          </div>
      </QueryClientProvider>
    )
  }


  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }

    return children;
  }

  const router = createBrowserRouter([    
        {
      path: "/",
      element: (
      <ProtectedRoute>
        <Layout/>
      </ProtectedRoute>
      ),
      children:[
        {
          path:"/",
          element: <Home/>
        },
        {
          path:"/profile/:id",
          element: <Profile/>
        },
        {
          path:"/reimbursement",
          element: <Reimbursement/>
        },
        {
          path:"/acara",
          element: <Acara/>
        },
        {
          path:"/absensi",
          element: <Absensi/>
        },
        {
          path:"/akun",
          element: <Akun/>
        },
        {
          path:"/laporan",
          element: <Laporan/>
        },
      ]
    },

    {
      path: "/login",
      element: <Login/>
    },

    {
      path: "/register",
      element: <Register/>
    },

    // {
    //   path: "/logout",
    //   element: <Logout/>
    // },
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
