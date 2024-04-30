import { confirmPushNotification } from "./firebase";
import "./App.css";
import { useState } from "react";

function App() {
  const [token, setToken] = useState<string | undefined>(undefined);

  const handlePushNotification = async () => {
    confirmPushNotification().then((newToken) => {
      setToken(newToken);
    });
  };
  return (
    <>
      <div>
        <a
          href="https://art19.com/shows/kkeethengineers"
          rel="noopenner noreferrer"
          target="_blank"
        >
          外部リンク（俺のポッドキャスト）
        </a>
      </div>
      <h1>Hello Web Push!</h1>
      <div className="card">
        <button type="button" onClick={handlePushNotification}>
          Push 通知を許可
        </button>
        <p>{token}</p>
      </div>
    </>
  );
}

export default App;
