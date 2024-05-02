import  { useEffect, useState } from "react";
import { Card, CardContent, Container, Divider, Form, FormField, Icon, Message, MessageHeader } from "semantic-ui-react";
import ScrollToBottom from 'react-scroll-to-bottom';

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
            setCurrentMessage('');
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
        <ScrollToBottom>
            <CardContent 
            style={{height:'400px', padding:'5px'}}>
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
                            <MessageHeader>{item.message}</MessageHeader>
                            <p>Sent by: <strong>{item.author}</strong>, at: <i>{item.time}</i></p>
                           
                        </Message>
                        <Divider/>
                        </span>
                    )
                })}
                   </CardContent>
         </ScrollToBottom>
      
        <CardContent extra>
            <Form>
                <FormField>
                <div className="ui action input">
                    <input
                        value={currentMessage}
                        type="text"
                        placeholder="Escribe un mensaje"
                        onChange={(e) => setCurrentMessage(e.target.value)} 
                        onKeyUp ={(e)=> {
                        if(e.key === 'Enter')sendMessage()
                        }
                        }
                    />
                    <button type='button' onClick={() => sendMessage()} className="ui teal icon right labeled button">
                    <Icon name="send" />
                        Send
                    </button>
                </div>
                </FormField>
            </Form>
     </CardContent>
  </Card>
  </Container>
  )
};

export default Chat;
