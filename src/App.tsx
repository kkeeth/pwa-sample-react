import { confirmPushNotification } from "./firebase";
import "./App.css";

function App() {
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
        <button type="button" onClick={confirmPushNotification}>
          Push 通知を許可
        </button>
      </div>
    </>
  );
}

export default App;
