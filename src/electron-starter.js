const electron = require('electron');
const app = electron.app;
const MainWindow = require('./mainwindow')
const Menu = electron.Menu
const DroneTray = require('./TimerTray')
const path = require('path');


let mainwindow
let tray

menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit()
                }
            }
        ]
        
    }
]

function createWindow() {
    app.dock.hide()
    mainwindow = new MainWindow('http://localhost:3000');
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `../pics/${iconName}`)   
    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu)
    tray = new DroneTray(iconPath, mainwindow)
    tray.setToolTip('Drone Race Application!')
}



app.on('ready', createWindow);