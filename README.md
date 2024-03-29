# RealTimeChatApp
RealTimeChatApp is a real-time chat application where users can instantly communicate with each other. This app was realized with MERN stack (MongoDB, Express.js, React, Node.js).

## Features

### User Authentication

- Users must create an account and log in to access the app's full functionality securely.

![Alt text](img/chat_register_page.png)
![Alt text](img/chat_login_page.png)

- After login the APIs is secured using JWT auth.

### User-Specific Experience

- After login, the user has a list of contacts where he can select one of them and start a nice chat. Messages between users are sent instantly thanks to socket.io

![Alt text](img/chat_chat_page.png)
