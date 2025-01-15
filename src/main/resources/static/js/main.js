// counter.js - Contains all our WebSocket and counter functionality
let stompClient = null;

// This function establishes the WebSocket connection when the page loads
function connect() {
    // Create a new SockJS connection to our WebSocket endpoint
    const socket = new SockJS('/counter-websocket');
    // Create a STOMP client over the SockJS connection
    stompClient = Stomp.over(socket);

    // Connect to the WebSocket server
    stompClient.connect({}, function(frame) {
        console.log('Connected to WebSocket: ' + frame);

        // Subscribe to both counter topics to receive updates
        stompClient.subscribe('/topic/counter1', function(response) {
            updateCounter(1, JSON.parse(response.body));
        });

        stompClient.subscribe('/topic/counter2', function(response) {
            updateCounter(2, JSON.parse(response.body));
        });
    });
}

// Updates the display for a specific counter
function updateCounter(counterId, value) {
    document.getElementById('counter' + counterId).textContent = value;
}

// Sends an increment message for a specific counter
function incrementCounter(counterId) {
    stompClient.send("/app/increment" + counterId, {}, {});
}

// Sends a decrement message for a specific counter
function decrementCounter(counterId) {
    stompClient.send("/app/decrement" + counterId, {}, {});
}

// Start the connection when the page loads
document.addEventListener('DOMContentLoaded', function() {
    connect();
});