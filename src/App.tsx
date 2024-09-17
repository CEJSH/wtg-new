import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.module.scss'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/map" Component={MapPage} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
