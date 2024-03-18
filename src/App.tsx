import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ExpensesMain } from 'features/expenses-main/expenses-main'
import { ExpensesMainContextProvider } from 'features/expenses-main/expenses-main.context'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="home"
          element={
            <ExpensesMainContextProvider>
              <ExpensesMain />
            </ExpensesMainContextProvider>
          }
        ></Route>
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
