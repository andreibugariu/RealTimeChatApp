import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import ChatInput from './ChatInput';
import Messages from './Messages';
import axios from 'axios'
import Logout from "./Logout";

const ChatContainer = ({ chatUser, currentUser, socket }) => {

    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    
    const handleSendMsg = async (msg) => {
        try {
            const result = await axios.post("http://localhost:5000/api/addmsg", {
                sender: currentUser._id,
                receiver: chatUser._id,
                msg: msg
            },{
    withCredentials: true
})
        } catch (err) {
            console.log("error can't send the message")
        }
        socket.current.emit("send-msg", {
            sender: currentUser._id,
            receiver: chatUser._id,
            message: msg
        })

        const msgs = [...messages];
        msgs.push({ sender: currentUser._id,
            receiver: chatUser._id, message: msg
        });
        console.log(msgs)
        setMessages(msgs);
    }

    // useEffect(() => {
    //     if (socket.current) {
    //         socket.current.on("msg-receive", (msg) => {
    //             setArrivalMessage({})
    //         })
    //     }
    // })

 const getMessages = async (senderID, receiverID) => {
    try {
        const messages = await axios.get('http://localhost:5000/api/getmsg', {
            params: { sender: senderID, receiver: receiverID },
            withCredentials: true
        });
        console.log(messages.data); // Assuming you want to log the messages to console
        setMessages(messages.data) // Return the messages to the caller if needed
    } catch (error) {
        console.error('Error getting messages:', error);
        return []; // Return an empty array or handle the error accordingly
    }
};


  useEffect( () => {
    getMessages(currentUser._id, chatUser._id);
  }, [chatUser])
    
    
    return (
        <>
            <Container>
                 <Logout id={currentUser._id} />
                <div className="chat-header">
                    <div className="user-details">
                        <div className="avatar">
                            <img src={chatUser.avatarImg} alt="avatar" />
                        </div>
                        <div className="username">
                            <h3>{chatUser.userName}</h3>
                        </div>
                    </div>
                </div>
               
                <Messages sender={currentUser} receiver={chatUser} messages={messages} />
                <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
    </>
  )
}

const Container = styled.div`

        .chat-header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 2rem;
            .user-details{
                display: flex;
                align-items: center;
                gap: 1rem;
                .avatar{
                    img {
                        height: 3rem;
                    }
                }
                .username{
                    h3{
                        color: white;
                    }
                }
            }
        }

    /
`;

export default ChatContainer