import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

const socket = io('ws://localhost:8000');

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      console.log(msg);
    });
  }, []);

  return (
    <div className="App">
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
