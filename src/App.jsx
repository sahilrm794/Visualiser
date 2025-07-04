import react from 'react'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Graph from './components/Graph'
import Sieve from './components/Sieve'
import Sorting from './components/Sorting'
function App() {
  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/' element={<Home/>}/>
      <Route path='/sorting' element={<Sorting/>}/>
      <Route path='/sieve' element={<Sieve/>}/>
      <Route path='/graph' element={<Graph />}/>
      </>
    )
  )

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
