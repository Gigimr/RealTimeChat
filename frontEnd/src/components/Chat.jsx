import  { useEffect, useState } from "react";
import { Card, CardContent, Container, Form, FormField, Icon, Input } from "semantic-ui-react";

const Chat = ({ socket, userName, room}) => {

    const [currentMessage, setCurrentMessage] =useState('');

    const sendMessage = async () => {
        if(userName && currentMessage){
            const info = {
                message: currentMessage,
                room: room,
                autor : userName,
                time : new Date(Date.now()).getHours() 
                + ":" +
                new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message', info);
        }
    }
    useEffect(()=>{
        socket.on('receive_message', (data) => {
            console.log(data);
        })
    },[socket])

  return (
  <Container>
    <Card fluid>
     <CardContent header={`Real time chat | Room: ${room}` }/>
         <CardContent>Messages</CardContent>
         <CardContent extra>
        <Form>
         <FormField>
          <Input
            action={{
                color: 'teal',
                labelPosition: 'right',
                icon: 'send',
                content: 'Send',
                onClick:sendMessage
              }}
             type="text"
             placeholder="Escribe un mensaje"
             onChange={(e) => setCurrentMessage(e.target.value)} 
             />
         </FormField>
        </Form>
        <Icon name='user' />4 Friends
     </CardContent>
  </Card>
  </Container>
  )
};

export default Chat;
