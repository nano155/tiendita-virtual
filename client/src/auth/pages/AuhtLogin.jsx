import { useEffect, useState } from "react"
import { useAuth } from "../../hook/useAuth"
import { useForm } from "../../hook/useForm"
import Input from "../components/Input"
import AuthLayout from "../layout/AuthLayout"
import { useNavigate } from "react-router-dom"


const AuthLogin = () => {

  const { onInputChange, onReset, email, password } = useForm({
    email: '',
    password: ''
  })
  const [errorInput, setErrorInput] = useState({
    email: '',
    password: ''
  })

  const { signin, error,user, isAuthenticated} = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated){
      if(user.userEntity.role === 'admin'){
        return console.log('soy el admin');
      }
      return console.log('Soy el user');
    }
   

   
  }, [isAuthenticated])


  
  const handleBlur = (field) => {
    if (!email.trim() && field === 'email') {
      setErrorInput((prevErrors) => ({
        ...prevErrors,
        email: 'Email is required'
      }))
      
    }
    if (!password.trim() && field === 'password') {
      setErrorInput((prevErrors) => ({
        ...prevErrors,
        password: 'Password is required'
      }))
    }
  }

  const handleFocus = (field) => {
    setErrorInput((prevErrors) => ({
      ...prevErrors,
      [field]: '' 
    }))
  }


  const onHandleClick = async (e) => {
    e.preventDefault()
    try {
      await signin({ email, password })

      onReset()

    } catch (error) {
      console.log(error);
    }


  }
  return (
    <>
      <AuthLayout btnState={
        (email.length === 0 || password.length === 0) ? true : false
      } 
        onHandleClick={onHandleClick} message={'No tienes una cuenta?'} messageType={'Ingresa'} linkAuth={'/auth/register'} nameButton={'Ingresa'} messageAuth={'registrate'} error={error}>
        <Input 
        onBlur={() => handleBlur('email')}
          onFocus={() => handleFocus('email')} nameL={'email'}
          name={'Email'} type={'email'} onChange={onInputChange} value={email} />
        {
          errorInput.email && <p className="text-red-500 font-semibold self-center">{errorInput.email}</p>
        }
        <Input
         onBlur={() => handleBlur('password')}
          onFocus={() => handleFocus('password')} nameL={'password'} 
          name={'Password'} type={'password'} onChange={onInputChange} value={password} />
        {
          errorInput.password && <p className="text-red-500 font-semibold self-center">{errorInput.password}</p>
        }
      </AuthLayout>
    </>
  )
}

export default AuthLogin
