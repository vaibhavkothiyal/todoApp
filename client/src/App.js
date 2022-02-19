import './App.css';
import { Todo } from './components/Todo/TodoInput';
import { Navbar } from './components/navbar.jsx/Navbar';
import {DirectRoutes } from './components/Routes/Routes'

function App() {
  return (
    <div>
      <Navbar />
      <DirectRoutes />
    </div>
  );
}

export default App;
