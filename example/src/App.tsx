import { useEffect } from "react";
import OneSignal from "react-onesignal";
import "./App.css";
import logo from "./logo.svg";

function App() {
  useEffect(() => {
    OneSignal.init({
      appId: "<YOUR_APP_ID>",
    }).then(() => {
      OneSignal.Debug.setLogLevel("trace");
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
