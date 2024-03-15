import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ExpensesMain } from 'features/expenses-main/expenses-main'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<ExpensesMain />}></Route>
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
