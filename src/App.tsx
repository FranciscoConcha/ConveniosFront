import { Route, Routes } from 'react-router-dom'
import Footer from './components/footer.tsx'
import Main from './pages/main/Main.tsx'
import RutVerificate from './pages/RutVerificate/RutVerificate.tsx'
import CardDisplay from './pages/CardDisplay/CardDisplay.tsx'
function App() {

  return (
    <>
      <Routes>
        <Route path='Home' element={<Main/>}/>
        <Route path='' element={<Main/>}/>
        <Route path='VerificateRut' element = {<RutVerificate/>}/>
        <Route path='CardDisplay' element ={<CardDisplay/>}/>
      </Routes>      
      <Footer/>
    </>
  )
}

export default App
