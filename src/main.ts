//#region require
const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const { dialog } = require('electron')

const os = require('os')
const git = require('git-utils')
//#endregion

//#region let
let win: { webContents: { openDevTools: () => void; }; loadFile: (arg0: string) => void; }
//#endregion

//#region let - repository
let repository = git.open('.')
let head = repository.getHead()
//#endregion

//#region app
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
//#endregion

//#region ipcMain
ipcMain.handle('get-directory-action', async () => {
    var result = await dialog.showOpenDialog(win, {
        properties: ['openDirectory']
    })
    var dir = result.filePaths[0]
    console.log(dir)
    return dir
})

ipcMain.handle('open-repo-action', (event: any, dir: string) => {
    console.log(event)
    repository = git.open(dir)
    head = repository.getHead()
    return head;
})

ipcMain.handle('git-reset-action', (event: any, args: any) => {
    console.log(event)
    console.log(args)
    return head
})
//#endregion
