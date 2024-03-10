const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 8000;

const publicPath = path.join(__dirname, "../public")
const filePath = path.join(__dirname, "../public/index.html")
// console.log(filePath);

// express middleware for css
app.use(express.static(publicPath))

app.get('/', (req, res) => {
    res.sendFile(filePath)
})

// socket
io.on("connection", (socket) => {
    console.log("connected..")

    // received data form client 
    socket.on("message", (data) => {
        // console.log(data)
        socket.broadcast.emit("message", data);
    })
})



http.listen(PORT, () => {
    console.log(`Listening to port no. ${PORT}`)
})