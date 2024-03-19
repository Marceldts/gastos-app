import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from 'pages/expenses-main/home'
import { ExpensesMainContextProvider } from 'pages/expenses-main/home.context'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="home"
          element={
            <ExpensesMainContextProvider>
              <Home />
            </ExpensesMainContextProvider>
          }
        ></Route>
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
