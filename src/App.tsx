import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { GroupPage } from 'pages/group/group'
import { GroupPageContextProvider } from 'pages/group/group.context'
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
              <GroupPageContextProvider>
                <GroupPage />
              </GroupPageContextProvider>
            }
          ></Route>
          <Route path="*" element={<Navigate to="home" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
