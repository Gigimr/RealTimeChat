import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './components/Chat';
import { Container, Card, CardContent, Form, FormField, Button } from 'semantic-ui-react'


const socket = io.connect(import.meta.env.VITE_API_URL);

function App() {
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (userName !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  }


  return (
    <Container>
      {!showChat ?
      <Card fluid>
        <CardContent header='Join the chat'/>
        <CardContent>
        <Form>
    <FormField>
      <label>Username</label>
      <input type='text'
       placeholder='Nombre de usuario'
       onChange={(e) => {setUserName(e.target.value)}}
      />
    </FormField>
    <FormField>
      <label>Room</label>
      <input type='text'
       placeholder='ID sala'
       onChange={(e) => {setRoom(e.target.value)}} 
      />
    </FormField>
    <Button onClick={joinRoom}>Join</Button>
  </Form>
        </CardContent>
      </Card>
      :
      <Chat socket={socket} userName={userName} room={room} />
}
    </Container>
  )
}

export default App
