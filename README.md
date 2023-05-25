# JS-Socket.io

https://drive.google.com/file/d/11qyBpE2jvUPEIj3qAKN16d30YW0L0Zdd/view?usp=sharing

Project Summary: Collaborative Drawing Application

The collaborative drawing application is a web-based project that enables multiple users to engage in a shared drawing experience. The project consists of several key components.

The server.js file serves as the server-side code, utilizing the Express.js framework and Socket.IO library. It sets up an Express server to handle HTTP requests and establishes a Socket.IO instance to facilitate real-time communication between clients and the server. The server serves static files, such as stylesheets and client-side scripts, and employs the EJS templating engine for rendering views. It manages active members, tracks the current color selected, and maintains an array of circles created by users. The server handles various events, including user connections and disconnections, username submissions, circle creation, and clearing of all circles.

On the client-side, the client.js file runs in the web browser and establishes a connection with the server using Socket.IO. It prompts users to enter their names and emits the submitUsername event to the server. The client listens for events from the server, such as updates on active members, notifications of user disconnections, color selection options, newly created circles, and requests to clear all circles. It allows users to interact with the application by selecting colors, creating circles on the shared canvas, and clearing all circles when desired.

The index.ejs file serves as the main HTML template for the application. It incorporates JavaScript libraries, such as jQuery and Socket.IO, and references the client-side JavaScript file. The template defines the user interface structure, including color selection buttons and a canvas area. It dynamically generates elements to display the currently active members in the shared drawing room.

Overall, this collaborative drawing application enables users to join a shared canvas and engage in a real-time drawing experience. With the ability to select colors, create circles on the canvas, and see updates from other connected users, it fosters collaborative creativity and interactive engagement among participants.
