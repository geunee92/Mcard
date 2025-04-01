import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@pages/Home'
import Test from '@pages/Test'
import Card from '@pages/Card'
import ScrollToTop from '@shared/ScrollToTop'
import SigninPage from './pages/Signin'
import SignupPage from './pages/Signup'
import Navbar from './components/shared/Navbar'
import PrivateRoute from './components/auth/PrivateRoute'
import ApplyPage from './pages/Apply'
import ApplyDone from './pages/ApplyDone'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/signin" Component={SigninPage} />

        <Route path="/signup" Component={SignupPage} />

        <Route path="/" Component={Home} />

        <Route path="/card/:id" Component={Card} />

        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <ApplyPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDone />
            </PrivateRoute>
          }
        />

        <Route path="/test" Component={Test} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
