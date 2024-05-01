import  { useEffect, useState } from "react";

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
  <div>
    <section className="chat-header">
        <p>Chat en vivo</p>
    </section>
    <section className="chat-messages">

    </section>
    <section className="chat-footer">
        <input type="text"
         placeholder="Escribe un mensaje"
         onChange={(e) => setCurrentMessage(e.target.value)} 
         />
        <button onClick={sendMessage}>Enviar &#9658;</button>
    </section>
  </div>
  )
};

export default Chat;
