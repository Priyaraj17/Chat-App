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
