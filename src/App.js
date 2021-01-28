import logo from './logo.svg';
import './App.css';
import {Router} from 'react-router-dom'
import {Routes, Navbar} from './components/indexComponents.js'
import history from './history'


function App() {
  return (
    <div className="App">
      <Router history = {history}>
        <Navbar/>
        <Routes/>
      </Router>
    </div>
  );
}

export default App;
