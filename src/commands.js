import React from 'react';
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import socket from './socket';
import { BCIDevice } from './BCIDevice';

const SECONDS = 0.25;
const BUFFER_SIZE = SECONDS * 256;
const WEIGHT = 0.95;

let buffer = new Array();
let weighted = {
    alpha: -1,
    beta: -1,
    theta: -1,
    gamma: -1,
    engagement: -1
};

let bci = new BCIDevice({
    dataHandler: data => {
        data.data.forEach(el => {
            if (buffer.length > BUFFER_SIZE) buffer.shift();
            buffer.push(el);
        });

        if (buffer.length < BUFFER_SIZE) return;

        let psd = window.bci.signal.getPSD(BUFFER_SIZE, buffer);

        let alpha = window.bci.signal.getBandPower(BUFFER_SIZE, psd, 256, "alpha");
        let beta  = window.bci.signal.getBandPower(BUFFER_SIZE,psd, 256, "beta");
        let theta = window.bci.signal.getBandPower(BUFFER_SIZE,psd, 256, "theta");
        let gamma = window.bci.signal.getBandPower(BUFFER_SIZE,psd, 256, "gamma");
        let engagement = beta / (alpha + theta);
        let sum = alpha + beta + theta + gamma;

        let w_alpha = alpha / sum;
        let w_beta = beta / sum;
        let w_theta = theta / sum;
        let w_gamma = gamma / sum;

        if (weighted.alpha < 0) {
            weighted.alpha = w_alpha || 0;
            weighted.beta = w_beta || 0;
            weighted.theta = w_theta || 0;
            weighted.gamma = w_gamma || 0;
            weighted.engagement = engagement || 0;
        } else {
            weighted.alpha = weighted.alpha * WEIGHT + (w_alpha || 0) * (1 - WEIGHT);
            weighted.beta =  weighted.beta  * WEIGHT + (w_beta  || 0)  * (1 - WEIGHT);
            weighted.theta = weighted.theta * WEIGHT + (w_theta || 0) * (1 - WEIGHT);
            weighted.gamma = weighted.gamma * WEIGHT + (w_gamma || 0) * (1 - WEIGHT);
            weighted.engagement = weighted.engagement * WEIGHT + (engagement || 0) * (1 - WEIGHT);
        }

        setInterval(function(){socket.emit('data', weighted.engagement)}, 5000)
        
    }, 

    statusHandler: status => {

    },

    connectionHandler: connected => {

    }
})

const sendCommand = command => {
    return function() {
        console.log('The command pressed was: ', command)
        socket.emit('command', command)
    }
    
}
const Button = styled.button`
&.center{
    align: Left
}
`;
const Commands = () => (
        <div>
            <div className="ui two top attached buttons">
                <button className="ui button" onClick={sendCommand('takeoff')}>Takeoff</button> 
                <button className="ui button" onClick= {sendCommand('land')}>Land</button>   
            </div>
            
            <div style= {{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto'
            }} className="ui vertical basic buttons">
                <button className= "ui button" onClick={sendCommand('down 50')}>Down 50cm</button>
                <button className="ui button" onClick={sendCommand('forward 50')}>Forward 50cm</button>
                <button className="ui button" onClick={sendCommand('left 50')}>Left 50cm</button>
                <button className="ui button" onClick={sendCommand('right 50')}>Right 50cm</button>
                <button className="ui button" onClick={sendCommand('up 50')}>Up 50cm</button>  
                <button className="ui button" onClick={sendCommand('back 50')}>Backwards 50cm</button>
            </div>
                
            {/* <div className="ui two bottom attached buttons">
                <button className="negative ui button" onClick= {sendCommand('emergency')}>Emergency</button>
                <button className="ui button" onClick= {sendConnection}>Connect!</button>   
            </div>    */}
            
        </div>
        
)




export default Commands;
