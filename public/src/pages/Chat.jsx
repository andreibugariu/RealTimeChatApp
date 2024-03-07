import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components"
import Contacts from '../components/Contacts'
import axios from "axios"
import ChatContainer from '../components/ChatContainer'
import {io} from "socket.io-client"
const Chat = () => {
  const socket = useRef();

  const user_id = localStorage.getItem("user_id")
  
  const [userAvatar, setUserAvatar] = useState("");
  const [currentUser, setCurrentUser] = useState()
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  
  const setAvatar = async () => {
    try{
      const result = await axios("http://localhost:5000/api/getUser/" + user_id, {
    withCredentials: true
});
      setCurrentUser(result.data)
      console.log(result.data)
      const user_avatar = result.data.avatarImg;
      setUserAvatar(user_avatar)
      console.log(user_avatar)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setAvatar()
  }, [])

  useEffect(() => {
    if (currentUser) {
      socket.current = io.apply("http://localhost:5000")
      socket.current.emit("add-user", currentUser._id)
    }
  },[currentUser])
  const getAllContacts = async () => {
    try {
      const result = await axios("http://localhost:5000/api/getUsers", {
    withCredentials: true
});
      setContacts(result.data);
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    getAllContacts()
  }, [])

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }
  return (
    <>
      <div className='full-chat'>
        <div className='container-chat'>
          <Contacts contacts={contacts} user={currentUser} changeChat={handleChatChange} />
          {
            currentChat === undefined ? <p>Please, select a person</p> : <ChatContainer
              chatUser={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          }
        </div>
      </div>
    </>
 
  )
}

export default Chat