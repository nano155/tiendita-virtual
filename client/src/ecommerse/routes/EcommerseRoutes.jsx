import { Navigate, Route, Routes } from "react-router-dom"
import Products from "../pages/ProductsPage"
import ProductFormPage from "../pages/ProductFormPage"
import HomePage from "../pages/HomePage"
import ProtectedRouteUser from "../../shared/ProtectedRouteUser"
import ProtectedRouteAdmin from "../../shared/ProtectedRouteAdmin"


const EcommerseRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      <Route element={<ProtectedRouteAdmin />}>
        <Route path='add-product' element={<ProductFormPage />} />
        <Route path='product/:id' element={<ProductFormPage />} />
      </Route>

      <Route element={<ProtectedRouteUser />}>
        <Route path="products" element={<Products/>} />
      </Route>
      <Route path="/*" element={<Navigate to={'/'} />} />

    </Routes>
  )
}

export default EcommerseRoutes
