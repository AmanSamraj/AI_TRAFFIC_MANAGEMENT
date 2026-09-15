import { useState } from 'react'
import './App.css'
import playAlert from './component/alert'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <button className="warning-dot" onClick={playAlert}>Aman Samraj</button>
    <h1 className='bg-amber-600'> Sih  project</h1>
    </>
  )
}

export default App
