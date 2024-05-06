import { createContext, useEffect, useState } from 'react'
import { loginRequest, registerRequest, getProductsRequest } from '../api/auth'


export const AuthContext  = createContext()


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [products, setProducts] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [error, setError] = useState(null)

    const signin = async (use_r) =>{
        try {
            const res = await loginRequest(use_r)
            setUser(res.data)
            setIsAuthenticated(true)
            setError(null)

          } catch (error) {
            setError(error.response.data.error)
          }   
        }

    const signup = async (user) =>{
        try {
            const res = await registerRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
            setError(null)

          } catch (error) {
            setError(error.response.data.error)
          }   
        }

        const getProducts = async () =>{
          try {
            const pr = await getProductsRequest()
            setProducts(pr.data.products)
            setError(null)
          } catch (error) {
            setError(error)
          }
        }


  return (
    <AuthContext.Provider value={{signup, signin, user,isAuthenticated, error, getProducts, products}}>
      {children}
    </AuthContext.Provider>
  )
}


