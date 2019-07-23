# Drone Racing 
## (Start up)
```
npm install
```
### Backend
After including all the necessay modules for running the code. Lets run the backend FIRST. Open the first terminal:

```
cd src
node tello.js
```

### Frontend
This will open the backend that will recieve the information from the frontend and communicate commands to the drone.  Next, we will open the front end (so you would need 2 terminals for opening the race):

``` 
npm run start
```

If buttons do not load properly:

```
cd src
npm run start
```
### Electron
Electron is UI that loads the program into a well developed web-application

```
npm run electron
```


## (Potential Changes)

```
const frequency
```
+ this is a variable that controls how quickly commands are being sent to the drone and engagement is being checked by the program.
	+ Ideal time: 3.5 s

```
let amplitude
```
+ this variable correlates to the height of which the drone is going

# Issues?
## Problem:
1. "Require" aspect is not valid inside the HTML document
2. Not displaying console log on Terminal
3. DevToolsToggle is not shown when app opens
4. In need of password for downloading FFmpeg

## Solution:
1. Then code is needed when opening the window to incorporate Javascript:

```
mainWindow = new BrowserWindow({webPreferences: {nodeIntegration: true}});
```
2.HTML console log will display on WebBrowser inside of the developer's tool terminal.

3.If the developer's tool does not appear you need this line to toggle the window:

```
mainWindow.webContents.toggleDevTools();
```
4.Solution was found on a later date.

### For loading all necessary .json items for developing an app [in Terminal]
```
npm install
npm install electron --save -dev --save -exact
```



## Helpful Diagram #1

![electron](/Users/Myles/desktop/images/electron.jpeg)

This diagram displays a basic overview and useful information that regards electron.  Most of the important topics are explained in the above problems and solutions.  An essential aspect of electron that was not covered above was IPC. IPC is "Internal Process Communication," which in turn just refers to the process of browser windows communicating between each other by using "event methods."




## Helpful Diagram #2
![events module](/Users/Myles/Desktop/images/Events_module.jpeg)

This diagram goes into more detail when wondering "what is an event module actually, and how do I implement it?"  

+ "name of Event Emitter".on is used when listening for when the event and what to do when the event is called.

+ "name of Event Emitter".emit will emit the name of the event for the listener to perform the function.

## Problems:
1. Cannot append an empty list into a Menu Bar. The following code will issue an error:

```
MenuTemplate.unshift({});
```

2.Deleting an array or list of items.

## Solutions:
1. Do not append an empty list! Even adding one small thing will cause the line not to be an ERROR.
2. This line will allow the user to delete/reset the list of elements:

```
document.querySelector('ul').innerHTML = ' ';
```

+ Helpful links for [formatting](semantic-ui.com) and [useful libraries](cdjns.com/libraries/semantic-ui) when using React!
+ Important Command Line for creating React apps in Terminal:

```
npx create-react-app <name of app>
```


+ When building the react app for a controller that allows manual input ['takeoff', 'land', 'directional movement' and an 'emergency' button] from the user that is sent to the drone, here are some helpful resources:
	+ Installing necessary libraries and general demonstartion of how the program should work [Part 1](https://www.youtube.com/watch?v=JzFvGf7Ywkk) & [Part 2](https://www.youtube.com/watch?v=ozMwRq-IT2w)
	+  This library will create websockets which will allow between to servers [front end and back end] to communicate between each other and relay information

	```
	npm install socket.io
	npm install express
	npm install dgram
	```


**React JSX file giving error “Cannot read property 'createElement' of undefined”**

+ [When importing files try not to deconstruct multiple varibles from a module](https://stackoverflow.com/questions/39423054/react-jsx-file-giving-error-cannot-read-property-createelement-of-undefined)
	+ DONT 
	```
	import {React, useEffect, useState} from 'react'
	```
	+ TRY
	
	```
	import React from 'react';
	import {useEffect, useState} from 'react';
	```
## Helpful Diagram #3
![controller-map](/Users/Myles/Desktop/images/controller-map.jpeg)
This image displays a visual representation of how the information is being sent from the user to a web-browser then to the backend-browser (which communicates to the robot).  This is done using web-sockets or the socket.io library. Here is some code that allows the back end webscoket to work:

```
	const app = require('express')()
	const server = require('http').createServer(app)
	const io = require('socket.io')(server)
	
	server.listen('6767', () => {
    console.log('up and running...')
})
```
