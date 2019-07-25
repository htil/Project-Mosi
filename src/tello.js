const dgram = require("dgram");
const commandDelays = require("./commandDelays");
//goes from the backend(robot information) to the frontend (User Interface)
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const Port = 8889;
const StatePort = 8890;
const Host = "192.168.10.1";

//backend: goes from robot to backend
const drone = dgram.createSocket("udp4");
drone.bind(Port);
const droneState = dgram.createSocket("udp4");
droneState.bind(StatePort);

let drone_takeoff = false;
let thresh = 0.2;
var engagement = 0;
var l_engagement = 0;

const handleError = err => {
  if (err) {
    return "This is the error: ", err;
  }
};

//When the server comes on:
io.on("connect", socket => {
  setInterval(moveDrone, frequency);
  socket.on("command", command => {
    console.log("command sent from browser: ", command);
    drone.send(command, 0, command.length, Port, Host, handleError);
  });
  socket.on("data", data => {
    engagement = data;
  });
  socket.on("headset:on", () => {
    console.log("headset was just connected!");
  });
  socket.emit("status", "CONNECTED");
});

const frequency = 3500;
let amplitude = 30;

function crtCMD(direction, distance) {
  return direction + " " + distance;
}

function command(direction, distance) {
  let cmd = crtCMD(direction, distance);
  drone.send(cmd, 0, cmd.length, Port, Host, handleError);
}

const focus = () => {
  console.log("Focus to pass threshhold of:", thresh);
  drone.send("command", 0, "command".length, Port, Host, handleError);
};

const start = () => {
  console.log("engagement is: ", engagement);
  console.log("drone is taking off");
  l_engagement = engagement;
  drone_takeoff = true;
  drone.send("takeoff", 0, 8, Port, Host, handleError);
};

const moveDrone = () => {
  if (engagement > thresh && drone_takeoff == true) {
    console.log(engagement);
    if (engagement < l_engagement) {
      console.log("moving up");
      command("up", amplitude);
    } else {
      console.log("moving up");
      command("up", amplitude);
    }
  } else if (engagement < thresh) {
    focus();
  }
  if (engagement > thresh && drone_takeoff == false) {
    start();
  }
  l_engagement = engagement;
};

server.listen("6767", () => {
  console.log("up and running...");
});

drone.on("message", message => {
  console.log(`${message}`);
});

drone.send("command", 0, 8, Port, Host, handleError);
