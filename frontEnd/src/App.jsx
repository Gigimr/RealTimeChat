import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';


const socket = io.connect('http://localhost:3001');

function App() {
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')

  const joinRoom = () => {
    if (userName !== '' && room !== '') {
      socket.emit('join_room', room);
    }
  }


  return (
    <>
    <div className='chat'>
      <h3 >Unirme al chat</h3>
      <input type='text'
       placeholder='Nombre de usuario'
       onChange={(e) => {setUserName(e.target.value)}}
      />
      <input type='text'
       placeholder='ID sala'
       onChange={(e) => {setRoom(e.target.value)}} 
      />
      <button onClick={joinRoom}>Unirme</button>
    </div>
    </>
  )
}

export default App
