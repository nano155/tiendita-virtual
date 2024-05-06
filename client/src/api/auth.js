import axios from "axios"


const API = 'http://localhost:8080/api'

export const loginRequest = (user) =>  axios.post(`${API}/users/login`, user)
export const registerRequest = (user) =>  axios.post(`${API}/users/register`, user)

export const getProductsRequest = () => axios.get(`${API}/products`)