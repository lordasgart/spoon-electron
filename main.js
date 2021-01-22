"use strict";
const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
var os = require('os');
console.log('hallo');
var git = require('git-utils');
var repository = git.open('.');
var head = repository.getHead();
console.log(head);
function createWindow() {
    const win = new BrowserWindow({
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
ipcMain.handle('git-reset-action', (event, args) => {
    console.log(event);
    console.log(args);
    return head;
});
//# sourceMappingURL=main.js.map