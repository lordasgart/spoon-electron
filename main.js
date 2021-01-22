"use strict";
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const os = require('os');
const git = require('git-utils');
let win;
let repository = git.open('.');
let head = repository.getHead();
function createWindow() {
    win = new BrowserWindow({
        width: 720,
        height: 564,
        webPreferences: {
            nodeIntegration: true
        },
        icon: './img/spoon-Cook-Book-icon.png'
    });
    win.webContents.openDevTools();
    win.loadFile('index.html');
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
ipcMain.handle('get-directory-action', async () => {
    var result = await dialog.showOpenDialog(win, {
        properties: ['openDirectory']
    });
    var dir = result.filePaths[0];
    console.log(dir);
    return dir;
});
ipcMain.handle('open-repo-action', (event, dir) => {
    console.log(event);
    repository = git.open(dir);
    head = repository.getHead();
});
ipcMain.handle('get-head-action', () => {
    return head;
});
ipcMain.handle('git-reset-action', (event, args) => {
    console.log(event);
    console.log(args);
    return head;
});
//# sourceMappingURL=main.js.map