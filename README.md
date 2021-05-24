# Chat-App

<h3> Description </h3>
<p>It is a real-time chat application built using Node.js, Express, Socket.io, RESTful Web
Service. 
Some the features of this application are
<ul>
<li>Uses Express as the application Framework.</li>
<li>Real-time communication between a client and a server using Socket.io.</li>
<li>Uses RESTful Web Service for serve different platforms.</li>
<li>I am currently working on integrating mongoDB, mongoose to store the messages.</li>
</ul>

# Working Procedure:
A connection is opened between the client and the server so that the client can send and receive data. This
allows real-time communication using TCP sockets. This is made possible by Socket.io. The client
connects to the server through a socket. Once connections is successful, client and server can emit and
listen to events. Currently, I am using an array called ‘users’ to store the information of all the new users.As
soon as a new user enters a chat room an object is created that contains all the information such as
username, id and room. This object is pushed into the ‘users’ array. The repository contains details
information about the code.

<h5>Features to add:</h5>
<ul>
<li>Authentication using jwt.</li>
<li>Database to store the messages.</li>
</ul>
 </p>

<h3> Usage </h3>
<pre> <code>
  cd Chat App
  npm install
  npm start
  Go to <a>http://localhost:3000/</a>
  </code>
</pre>
Feel free to play with it.

<h3> Screenshots </h3>
<p>
 
![WhatsApp Image 2021-05-24 at 7 46 13 PM](https://user-images.githubusercontent.com/40101776/119361837-b79e8600-bcc9-11eb-87a9-154c70ab92eb.jpeg)

![WhatsApp Image 2021-05-24 at 7 45 43 PM](https://user-images.githubusercontent.com/40101776/119361850-ba00e000-bcc9-11eb-8954-431a3d7ccd58.jpeg)
 </p>


# How to understand the code?
<p> Please take a look <a href="https://github.com/Priyaraj17/Chat-App/blob/master/Code-explanation.pdf"> here </a></p>

# Code

<h3> Server.js: </h3>

<p>
I started with setting up the server for the application and installed all the npm  packages such as express, socket.io etc. Socket.io is a library that enables real-time, bidirectional and event based connection between the browser and server.


![Screenshot (252)](https://user-images.githubusercontent.com/40101776/119270363-f412a900-bc19-11eb-968a-d684a82bb49d.png)



![Screenshot (252) (1)](https://user-images.githubusercontent.com/40101776/119270225-469f9580-bc19-11eb-9b08-0cc3befd205d.png)

![Screenshot (251)](https://user-images.githubusercontent.com/40101776/119270253-6931ae80-bc19-11eb-9f5e-2324031cc73b.png)

</p>



<p>
As soon as the client connects to the server, two messages are broadcasted to the chat room.

<ul>
 <li>“Welcome to ChatCord”.</li>
 <li>“Alex has joined the chat”. </li>
 </ul>

When a client leaves the chat, a message is broadcasted that a user has left the chat.

![Screenshot (253)](https://user-images.githubusercontent.com/40101776/119270415-2f14dc80-bc1a-11eb-969c-c018e40e1922.png)
</p>
<h3> User.js: </h3>

<p>
I created a separate file for users which handles all the functionalities of a user such as joining the server, leaving the server, getting the current user etc.

For the challenge, instead of using databases, I stored the user information in an array called users.
Every time a new user enters a chatroom, an object is created which contains the information : username, id, room. This object is then pushed to the users array.

![Screenshot (254)](https://user-images.githubusercontent.com/40101776/119270436-4ce24180-bc1a-11eb-8b0f-d3ca78a6e6f1.png)

 </p>

<h3> Main.js: </h3>

<p>
It is the client side javascript file which acts as an interface between the server and the user. 
<ul>
<li> Outputs the message to the DOM.

![Screenshot (257)](https://user-images.githubusercontent.com/40101776/119270461-65eaf280-bc1a-11eb-8d20-89f5463878fd.png)

 </li>

<li>
 Add room names and usernames to the DOM.

![Screenshot (257) (1)](https://user-images.githubusercontent.com/40101776/119270474-7307e180-bc1a-11eb-955a-7dd2efd7e421.png)
 </li>
 </ul>

</p>

#Updates:
I am working on integrating a database that will store the chat messages and the users information. I am working on a new branch. Please visit this <a href="https://github.com/Priyaraj17/Chat-App/tree/new_changes"> link</a>.
