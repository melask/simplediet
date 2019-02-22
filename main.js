const { app, BrowserWindow } = require('electron')
const Server = require('./core');
const server = new Server();
server.init();

let win;

function createWindow(page='index', withDev=false) {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadFile(`${page}.html`)
  if (withDev) win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })
}
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('ready', () => {
  createWindow()
})