import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from 'pages/home/home'
import { ExpensesMainContextProvider } from 'pages/home/home.context'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="home/:id"
          element={
            <ExpensesMainContextProvider>
              <Home />
            </ExpensesMainContextProvider>
          }
        ></Route>
        <Route path="*" element={<Navigate to="home/1" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
