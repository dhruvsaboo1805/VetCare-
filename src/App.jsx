import { Route, Routes } from 'react-router-dom'
import './App.css'
import Loader from "./components/Loader"
import { lazy } from 'react'

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  
  return (
    <div className=''>
      <div className="navabr">
      </div>
      {/* <Suspense fallback = {<Loader />}> */}
          <Routes>
            <Route path = "/login" element = {<Login />}></Route>
            <Route path = "/SignUp" element = {<SignUp />}></Route>
            <Route path = "/home" element = {<Home />}></Route>
          </Routes>
      {/* </Suspense> */}
    </div>
  )
}

export default App
