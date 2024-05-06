import Input from "../components/Input"
import AuthLayout from "../layout/AuthLayout"
import { useEffect, useState } from "react"
import { useAuth } from "../../hook/useAuth"
import { useForm } from "../../hook/useForm"
import { useNavigate } from "react-router-dom"


const AuthRegister = () => {
  const { onInputChange, onReset, email, password, first_name, last_name, birthdate } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birthdate: ''
  })
  const [errorInput, setErrorInput] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birthdate: ''
  })
  const navigate = useNavigate()

  const { error, isAuthenticated, signup } = useAuth()


  useEffect(() => {
    if(isAuthenticated) navigate('auth/login')

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
      const age = new Date().getFullYear() - new Date(birthdate).getFullYear()

      await signup({
        first_name,
        last_name,
        email,
        password,
        age
      })
      onReset()

    } catch (error) {
      console.log(error);
    }


  }
  return (
    <>
      <AuthLayout btnState={
        (first_name.length === 0 || last_name.length === 0 || email.length === 0 || birthdate.length === 0 || password.length === 0) ? true : false
      }
        onHandleClick={onHandleClick} message={'Ya tienes una cuenta?'} messageType={'Register'} linkAuth={'/auth/login'} nameButton={'Register'} messageAuth={'Ingresa'} error={error}>
        <Input
          onBlur={() => handleBlur('first_name')}
          onFocus={() => handleFocus('first_name')} nameL={'Nombre'}
          name={'first_name'} type={'text'} onChange={onInputChange} value={first_name} />
        {
          errorInput.name && <p className="text-red-500 font-semibold self-center">{errorInput.name}</p>
        }
        <Input
          onBlur={() => handleBlur('last_name')}
          onFocus={() => handleFocus('last_name')} nameL={'Apellido'}
          name={'last_name'} type={'text'} onChange={onInputChange} value={last_name} />
        {
          errorInput.last_name && <p className="text-red-500 font-semibold self-center">{errorInput.last_name}</p>
        }
        <Input
          onBlur={() => handleBlur('email')}
          onFocus={() => handleFocus('email')} nameL={'Email'}
          name={'email'} type={'email'} onChange={onInputChange} value={email} />
        {
          errorInput.email && <p className="text-red-500 font-semibold self-center">{errorInput.email}</p>
        }
        <Input
          onBlur={() => handleBlur('birthdate')}
          onFocus={() => handleFocus('birthdate')} nameL={'Fecha de nacimiento'}
          name={'birthdate'} type={'date'} onChange={onInputChange} value={birthdate} />
        {
          errorInput.birthdate && <p className="text-red-500 font-semibold self-center">{errorInput.birthdate}</p>
        }
        <Input
          onBlur={() => handleBlur('password')}
          onFocus={() => handleFocus('password')} nameL={'Password'}
          name={'password'} type={'password'} onChange={onInputChange} value={password} />
        {
          errorInput.password && <p className="text-red-500 font-semibold self-center">{errorInput.password}</p>
        }
      </AuthLayout>
    </>
  )
}

export default AuthRegister
