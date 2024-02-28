import React from 'react'
import styled from "styled-components";
import ChatInput from './ChatInput';
import Messages from './Messages';

const ChatContainer = ({ chatUser }) => {
    
    const handleSendMsg =  async  (msg) => {
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
                <Messages/>
                <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
    </>
  )
}

const Container = styled.div`
    padding-top: 1rem;
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
`;

export default ChatContainer