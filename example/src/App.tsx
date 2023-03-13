import logo from './logo.svg';
import './App.css';

function App() {
  try {
    OneSignal.init({
      appId: "f5d104e9-7462-4bf7-adc8-4ca501cb55b2",
    }).then(() => {
      OneSignal.Debug.setLogLevel('trace');
      OneSignal.login("rodrigo");
      OneSignal.User.addAlias("myAlias", "1");
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
