import './App.css'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import { store } from './app/store'
import HomeMap from './pages/HomeMap'

function App() {

  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomeMap />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
