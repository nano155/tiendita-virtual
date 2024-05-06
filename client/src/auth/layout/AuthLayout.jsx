import { Link } from "react-router-dom"
import Button from "../components/Button"



const AuthLayout = ({ children, onHandleClick, nameButton, message, linkAuth, messageAuth, messageType, error, onFocus, btnState }) => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <form onFocus={onFocus} onSubmit={onHandleClick} className="flex flex-col w-100 gap-2 px-16 py-10 bg-violet-800 rounded-lg">
        <h3 className="mb-5 text-xl font-bold">{messageType}</h3>
        {children}

        <section className="mt-10 flex flex-col gap-3">
          <Button btnState={btnState} nameButton={nameButton} />
          {
            error && <p className="text-red-500 font-semibold self-center">{error}</p>
          }
          <p>{message}<span>  {messageAuth} <Link className="text-gray-400 font-bold" to={linkAuth}>aqui!</Link></span></p>
        </section>
      </form>
    </div>
  )
}

export default AuthLayout
