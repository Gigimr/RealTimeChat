import  { useEffect, useState } from "react";
import { Card, CardContent, Container, Divider, Form, FormField, Icon, Input, Message, MessageHeader } from "semantic-ui-react";

const Chat = ({ socket, userName, room}) => {
    const [currentMessage, setCurrentMessage] =useState('');
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if(userName && currentMessage){
            const info = {
                message: currentMessage,
                room: room,
                author : userName,
                time : new Date(Date.now()).getHours() 
                + ":" +
                new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message', info);
            setMessageList((list) => [...list, info])
        }
    }
    useEffect(()=>{
            const messageHandle = (data) => {
                setMessageList((list) => [...list, data])
            }
        socket.on('receive_message', messageHandle);

        return () => socket.off('receive_message', messageHandle)
    },[socket])

  return (
  <Container>
    <Card fluid>
     <CardContent header={`Real time chat | Room: ${room}` }/>
         <CardContent 
            style={{minHeight:'300px'}}>
                {messageList.map((item,i) => {
                    return (
                        <span key={i}>
                        <Message 
                         style={{textAlign:  
                                  userName === item.author ? 'right':'left'
                        }}
                        success={userName === item.author}
                        info={userName !== item.author}
                        >
                            <MessageHeader>{item.author}</MessageHeader>
                            <p>{item.message}</p>
                            <i>{item.time}</i>
                        </Message>
                        <Divider/>
                        </span>
                    )
                })}
         </CardContent>
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
