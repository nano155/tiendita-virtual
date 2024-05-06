import {Route, Routes} from 'react-router-dom'
import AuthRoutes from '../auth/routes/AuthRoutes'
import EcommerseRoutes from '../ecommerse/routes/EcommerseRoutes'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/auth/*' element={<AuthRoutes/>}/> 
      <Route path='/*' element={<EcommerseRoutes/>}/> 
    </Routes>
  )
}

export default AppRoutes
