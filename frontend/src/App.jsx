import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing_Home from './components/Landing_Home'
import AuthForm from './components/AuthForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing_Home />} />
        <Route path="/login" element={<AuthForm initialMode="login" />} />
        <Route path="/register" element={<AuthForm initialMode="register" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
