import { useLocation,Navigate } from "react-router-dom";


const PrivateRoute=({children})=>{
    const location=useLocation()
    const token=localStorage.getItem("token")
    if(!token){
       return  <Navigate to={'/login'} state={{from:location}} replace />
    }

    return children
}

export default PrivateRoute