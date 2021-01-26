import logo from './logo.svg';
import './App.css';
import {Router} from 'react-router-dom'
import {Routes, Navbar} from './components/indexComponents.js'
import history from './history'
import RoutineContext, {useRoutine} from './contexts/routineContext'

function App() {
  const routine = useRoutine()
  return (
    <div className="App">
      <RoutineContext.Provider value = {useRoutine}>
      <Router history = {history}>
        <Navbar/>
        <Routes/>
      </Router>
      </RoutineContext.Provider>
    </div>
  );
}

export default App;
