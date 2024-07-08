import { useState } from 'react'

import './App.css'
import { useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import Home from '../components/Home'

function App() {

const {loading}=useSelector((state)=>state.loaders)

  return (
    <>
       {loading && <Spinner/>}
       <Home/>
    </>
   


  )
}

export default App
