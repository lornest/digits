import { useState } from 'react'
import NumberBubble from './components/Number.jsx'
import './App.css'
import Target from './components/Target.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Target />
      <div class="container mx-auto p-4">
        <div class="grid grid-cols-3 grid-rows-2 gap-4">
          <NumberBubble />
          <NumberBubble />
          <NumberBubble />
          <NumberBubble />
          <NumberBubble />
          <NumberBubble />
        </div>
      </div>
    </>
  )
}

export default App
