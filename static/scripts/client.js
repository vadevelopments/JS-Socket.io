$(document).ready(function() {
    const socket = io();
    const btnyellow = $('#btnyellow');
    const btngreen = $('#btngreen');
    const btnblue = $('#btnblue');
    const btnpink = $('#btnpink');
    const btnclear = $('#clear');
  
    let name = prompt('What is your name?');
    while (!name) {
        name = prompt('Please enter a valid name.');
    }
  
    socket.emit('submitUsername', { username: name });
  
    socket.on('activeMembers', function(data) {
        const membersDiv = $('#members');
        membersDiv.html('<h3>Members in room</h3>');

        for (let i = 0; i < data.activeMember.length; i++) {
            const memberName = data.activeMember[i];

            if (memberName === name) {
                membersDiv.append(`<p>${memberName} (you)</p>`);
            }
            else {
                membersDiv.append(`<p>${memberName}</p>`);
            }
        }
    });
  
    socket.on('userDisconnected', function(data) {
        const membersDiv = $('#members');
        membersDiv.html('<h3>Members in room</h3>');

        for (let i = 0; i < data.length; i++) {
            const memberName = data[i];

            if (memberName === name) {
                membersDiv.append(`<p>${memberName} (you)</p>`);
            }
            else {
                membersDiv.append(`<p>${memberName}</p>`);
            }
        }
    });

    socket.on('selectColors', (data) => {
        const colors = data.colors;
        let currentColor = data.currentColor || colors.yellow;
    
        btnyellow.click(() => {
            currentColor = colors.yellow;
        });
    
        btngreen.click(() => {
            currentColor = colors.green;
        });
    
        btnblue.click(() => {
            currentColor = colors.blue;
        });
    
        btnpink.click(() => {
            currentColor = colors.pink;
        });
    
        $(document).click(() => {
            const target = event.target;
            const isHoveringTag = $(target).is('a'); // Check if the target element is a tag (e.g. an <a> element)

            if(!isHoveringTag){
                const rand_radius = Math.floor(Math.random()*(80) + 20);
                const circle = document.createElement('div');
                circle.classList.add('circle');
                circle.style.backgroundColor = currentColor;
                circle.style.top = (event.pageY-(rand_radius/2)) + 'px';
                circle.style.left = (event.pageX-(rand_radius/2)) + 'px';
                circle.style.width = rand_radius + 'px';
                circle.style.height = rand_radius + 'px';
                document.body.appendChild(circle);
            
                // Emit new circle data to server
                const circleData = {
                    color: currentColor,
                    top: circle.style.top,
                    left: circle.style.left,
                    width: circle.style.width,
                    height: circle.style.height
                };
                socket.emit('newCircle', { ...circleData,  username: name });
            }
        });
    });
    
    socket.on('newCircle', (newCircle) => {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.backgroundColor = newCircle.color;
        circle.style.top = newCircle.top;
        circle.style.left = newCircle.left;
        circle.style.width = newCircle.width;
        circle.style.height = newCircle.height;

        // Create a new span element for the user's name
        const usernameSpan = document.createElement('span');
        usernameSpan.innerText = newCircle.username; // assuming the `newCircle` object also contains a `username` property

        // Append the span element to the circle element
        circle.appendChild(usernameSpan);

        document.body.appendChild(circle);
    });

    btnclear.click(() => {
        // Emit message to server to clear all circles
        socket.emit('clearAllCircles');
    });
    
    socket.on('clearAllCircles', () => {
        $('.circle').remove(); // remove all circles from the DOM
    });    
});
  