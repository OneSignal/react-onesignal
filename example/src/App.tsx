import OneSignal from "react-onesignal";
import "./App.css";
import logo from "./logo.svg";

function App() {
  try {
    OneSignal.init({
      appId: "67b7b84e-ac1d-460f-8516-4876dadeeb7a",
    }).then(() => {
      OneSignal.Debug.setLogLevel("trace");
      OneSignal.login("Fadi 2");
    });
  } catch (e) {
    console.log(e);
  }

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
