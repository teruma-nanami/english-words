import { Route, Routes } from 'react-router-dom'
import AdminRoute from './components/AdminRoute'
import AdminWordbookCreate from './components/AdminWordbookCreate'
import AdminWordbookEdit from './components/AdminWordbookEdit'
import AdminWordbookSelect from './components/AdminWordbookSelect'
import AdminWordCreate from './components/AdminWordCreate'
import AdminWordEdit from './components/AdminWordEdit'
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
          <Route path="wordbooks/add" element={<AdminWordbookCreate />} />
          <Route path="wordbooks/:id/edit" element={<AdminWordbookEdit />} />
          <Route path="words/create-wordbook" element={<AdminWordbookSelect />} />
          <Route path="words/create-wordbook/:wordbookId" element={<AdminWordCreate />} />
          <Route path="words/:id/edit" element={<AdminWordEdit />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
