import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import WordList from './components/WordList'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WordList />} />
      </Routes>
    </>
  )
}

export default App
