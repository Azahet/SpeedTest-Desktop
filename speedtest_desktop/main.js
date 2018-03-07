const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

require('electron-reload')(__dirname);



const path = require('path')
const url = require('url')
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 400,
    titleBarStyle: 'hiddenInset',
    frame: false,
    resizable: false,
    backgroundColor: '#1B1B1E',
    radii: [5, 5, 5, 5],
    transparent: true,
    opacity: 0.9,
    icon: path.join(__dirname, 'assets/img/64x64.png')
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})