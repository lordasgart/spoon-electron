"use strict";
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const os = require('os');
const git = require('git-utils');
let win;
let repository = git.open('.');
let head = repository.getHead();
let path = repository.getPath();
let username = repository.getConfigValue('user.name');
let useremail = repository.getConfigValue('user.email');
let repostatus = repository.getStatus();
function createWindow() {
    win = new BrowserWindow({
        width: 720,
        height: 564,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true
        },
        icon: './img/spoon-Cook-Book-icon.png'
    });
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
    path = repository.getPath();
    username = repository.getConfigValue('user.name');
    useremail = repository.getConfigValue('user.email');
});
ipcMain.handle('get-head-action', () => {
    return head;
});
ipcMain.handle('get-path-action', () => {
    return path;
});
ipcMain.handle('get-username-action', () => {
    return username;
});
ipcMain.handle('get-useremail-action', () => {
    return useremail;
});
ipcMain.handle('git-setuser-action', (event, usernamearg, useremailarg) => {
    console.log(event);
    let username = usernamearg;
    let useremail = useremailarg;
    repository.setConfigValue('user.name', username);
    repository.setConfigValue('user.email', useremail);
});
ipcMain.handle('git-getstatus-action', () => {
    return repostatus;
});
ipcMain.handle('git-reset-action', (event, args) => {
    console.log(event);
    console.log(args);
});
//# sourceMappingURL=main.js.map