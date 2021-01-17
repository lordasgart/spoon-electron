const { app, BrowserWindow } = require('electron')
var os = require('os')

function createWindow() {
    const win = new BrowserWindow({
            width: 720,
            height: 564,
            webPreferences: {
                nodeIntegration: true
            },
            icon: 'img/spotlight-47-Spotlight-icon.png'
        })
        win.webContents.openDevTools();
    win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})