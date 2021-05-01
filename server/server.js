require("dotenv").config();
const socket = require('socket.io');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));
app.use(cookieParser());

// setup mongodb
// this require statement is like copying and pasting the code from that file right here!
require('./config/mongoose.config');

// setup routes
require('./routes/user.routes')(app);

const server = app.listen(port, () => console.log("Listening on port: " + port));

// to initialize the socket, we need to invoke a new instance
//     of socket.io and pass it our express server instance
// We must also include a configuration settings object to prevent CORS errors
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});


let players = [];
let sockets = [];
function matchPlayers(user, socket) {
    // if we now have two players in queue
    sockets.push(socket);
    players.push(user);
    if ( players.length > 1 )
    {
        console.log("two players!")
        let match = {};
        // dequeue the players waiting
        const player1 = players.shift();
        const socket1 = sockets.shift();
        const player2 = players.shift();
        const socket2 = sockets.shift();
        // set the roomId we will subscribe them to later
        const roomId = `${player1.socket_id}${player2.socket_id}`
        // assign colors to the players
        player1.color = "w";
        player2.color = "b"
        // set the match
        match.turn = 'w';
        match.player1 = player1;
        match.player2 = player2;
        match.roomId = roomId;
        // console.log(match);
        // give each client the match
        socket1.emit(player1.socket_id, match);
        socket2.emit(player2.socket_id, match);
    }
    else 
    {
        console.log("A player has joined the queue")
    }
}
io.on("connection", socket => {
    console.log('socket id: ' + socket.id);

    // reply to every incoming client
    socket.on(`${socket.id}_server`, (user) => {
        matchPlayers(user, socket);
    })

    socket.on('new_game', match => {
        console.log(`joining new room ${match.roomId}`)
        socket.join(match.roomId)
    })

    // socket.on('new_move', match => {
    //     console.log(match.board)
    //     socket.to(match.roomId).emit('opponent_moved', match.board);
    // })

    socket.on('new_move', match => {
        // console.log('server hello')
        // if ( match.turn == 'b' )
        // if ( match.turn == 'w' )
        // {
        //     match.turn = 'b'
        // }
        // else
        //     match.turn = 'w'
        // match.player1.turn = !match.player1.turn;
        // match.player2.turn = !match.player2.turn;
        socket.to(match.roomId).emit('opponent_moved', match);
    })
});