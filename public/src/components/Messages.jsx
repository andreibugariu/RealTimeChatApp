import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import axios from 'axios'
const Messages = ({ sender, receiver }) => {
  
  const [messages, setMessages] = useState([]);


  const getMessages = async (senderID, receriverID) => {
    try {
      const messages = await axios.get('http://localhost:5000/api/getmsg', {
       params: { sender: senderID, receiver: receriverID }
      })
      console.log(messages.data)
      setMessages(messages.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect( () => {
    getMessages(sender._id, receiver._id);
  },[receiver])

  return (
    <Container>
     <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index}>
            <div className={`message ${message.sender === sender._id ? "sended" : "received"}`}>
              <div className="content">
                <p>
                 {message.message.text}
              </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </Container>
  )
}

const Container = styled.div`
    .chat-messages{
      padding: 1rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      overflow: auto;
      .message{
        display: flex;
        align-items: center;
        .content{
          max-width: 40%;
          overflow-wrap: break-word;
          padding: 1rem;
          font-size: 1.1rem;
          border-radius: 1rem;
          color: #d1d1d1;
        }
      }
      .sended {
        justify-content: flex-end;
        .content{
          background-color: green;
        }
      }
      .received {
        justify-content: flex-start;
        .content{
          background-color: red;
        }
      }
    }
`;

export default Messages