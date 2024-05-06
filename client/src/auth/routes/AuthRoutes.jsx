import { Routes, Route, Navigate } from 'react-router-dom'
import AuthLogin from '../pages/AuhtLogin'
import AuthRegister from '../pages/AuthRegister'

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path='login' element={<AuthLogin/>} />
            <Route path='register' element={<AuthRegister />} />
            <Route path='/*'  element ={<Navigate to="/auth/login" />} />
        </Routes>
    )
}

export default AuthRoutes
