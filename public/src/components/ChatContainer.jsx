import React from 'react'
import styled from "styled-components";
import ChatInput from './ChatInput';
import Messages from './Messages';
import axios from 'axios'

const ChatContainer = ({ chatUser, currentUser }) => {
    
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

    }
    return (
    <>
        <Container>
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
                <Messages sender={currentUser} receiver={chatUser} />
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