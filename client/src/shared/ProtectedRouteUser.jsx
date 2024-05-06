import { useAuth } from "../hook/useAuth"
import {Navigate, Outlet} from "react-router-dom"


const ProtectedRouteUser = () => {
    const { isAuthenticated} = useAuth()

    if(!isAuthenticated) return <Navigate to='/auth/login' replace/>

  return (
    <Outlet/>
  )
}

export default ProtectedRouteUser
