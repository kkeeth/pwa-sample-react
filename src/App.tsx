import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://art19.com/shows/kkeethengineers" rel="noopenner noreferrer" target='_blank'>
          外部リンク（俺のポッドキャスト）
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type='button' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
