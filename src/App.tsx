import { Route, Routes } from 'react-router-dom'
import Footer from './components/footer.tsx'
import Main from './pages/main/Main.tsx'
import RutVerificate from './pages/RutVerificate/RutVerificate.tsx'
import CardDisplay from './pages/CardDisplay/CardDisplay.tsx'
import LoginAdmin from './pages/AdminLogin/LoginAdmin.tsx'
import Convenios from './pages/padletInformativo/Convenios.tsx'
import ProtectedRoute from './components/protectRoute/protectRoute.tsx'
import StudentAdmin from './admin/pages/CudStudent/crudStudet.tsx'
import AdminMain from './admin/pages/main/main.tsx'
function App() {

  return (
    <>
      <Routes>
        <Route path='Home' element={<Main/>}/>
        <Route path='' element={<Main/>}/>
        <Route path='VerificateRut' element = {<RutVerificate/>}/>
        <Route path='CardDisplay' element ={<CardDisplay/>}/>
        <Route path='AdminLogin' element={<LoginAdmin/>}/>
        <Route path='Convenios' element= {<Convenios/>}/>
        <Route path='Admin/Students' element={<ProtectedRoute><StudentAdmin/></ProtectedRoute>}/>
        <Route path='main' element={<ProtectedRoute><AdminMain/></ProtectedRoute>}/>
      </Routes>      
      <Footer/>
    </>
  )
}

export default App
