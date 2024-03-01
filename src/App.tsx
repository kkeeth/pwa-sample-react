import { useState } from 'react'
import { onMessage } from 'firebase/messaging'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { messaging } from './firebase';
import './firebase-messaging-sw';

function App() {
  const [count, setCount] = useState(0)

  onMessage(messaging, payload => {
    console.log('Message received. ', payload);
  })

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
