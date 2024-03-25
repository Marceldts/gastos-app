import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { GroupPage } from 'pages/group/group'
import { ExpensesMainContextProvider } from 'pages/group/group.context'
import { HomePage } from 'pages/home/home'

//TODO: Create new landing page called home
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<HomePage />}></Route>
          <Route
            path="group/:id"
            element={
              <ExpensesMainContextProvider>
                <GroupPage />
              </ExpensesMainContextProvider>
            }
          ></Route>
          <Route path="*" element={<Navigate to="group/1" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
