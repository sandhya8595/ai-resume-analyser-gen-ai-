import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnalysisProvider } from './context/AnalysisContext'
import Navbar from './components/common/Navbar'
import HomePage from './pages/HomePage'
import AnalysisPage from './pages/AnalysisPage'

export default function App() {
  return (
    <BrowserRouter>
      <AnalysisProvider>
        <div className="min-h-screen hero-bg">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analysis/:resumeId" element={<AnalysisPage />} />
          </Routes>
        </div>
      </AnalysisProvider>
    </BrowserRouter>
  )
}
