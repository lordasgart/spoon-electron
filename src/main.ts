const { app, BrowserWindow } = require('electron')
// In the Main process
const { ipcMain } = require('electron')
const { dialog } = require('electron')
var os = require('os')
console.log('hallo')
var git = require('git-utils')
var repository = git.open('.')
var head = repository.getHead()
console.log(head)
/*
var repository = git.open('/home/lordasgart/Projects/spoon-electron')
*/

let win: { webContents: { openDevTools: () => void; }; loadFile: (arg0: string) => void; }

function createWindow() {
    win = new BrowserWindow({
        width: 720,
        height: 564,
        webPreferences: {
            nodeIntegration: true
        },
        icon: './img/spoon-Cook-Book-icon.png'
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

ipcMain.handle('open-repo-action', async (event: any, args: any) => {
    console.log(event)
    console.log(args)

    var result = await dialog.showOpenDialog(win, {
        properties: ['openDirectory']
    });
    var dir = result.filePaths[0]
    console.log(dir);
})

ipcMain.handle('git-reset-action', (event: any, args: any) => {
    console.log(event)
    console.log(args)
    return head
})
