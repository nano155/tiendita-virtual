import Canvas from "./background/Canvas"
import { AuthProvider } from "./context/AuthContext"
import AppRoutes from "./routes/AppRoutes"

const App = () => {
  return (
    <>
    <AuthProvider>
     <Canvas/>
      <AppRoutes/>
    </AuthProvider>
    </>
  )
}

export default App

