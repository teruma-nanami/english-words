import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Test from './components/Test'
import WordList from './components/WordList'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WordList />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  )
}

export default App
