import { Route, Routes } from 'react-router-dom'
import AdminRoute from './components/AdminRoute'
import AdminWordbookSelect from './components/AdminWordbookSelect'
import AdminWordCreate from './components/AdminWordCreate'
import AdminWordList from './components/AdminWordList'
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
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="words" element={<AdminWordList />} />
          <Route path="words/create-wordbook" element={<AdminWordbookSelect />} />
          <Route path="words/create-wordbook/:wordbookId" element={<AdminWordCreate />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
