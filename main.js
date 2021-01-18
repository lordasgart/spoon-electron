var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow;
var os = require('os');
console.log('hallo');
var git = require('git-utils');
var repository = git.open('C:\\Users\\lordasgart\\Projects\\spoon-electron');
var head = repository.getHead();
console.log(head);
/*
var repository = git.open('/home/lordasgart/Projects/spoon-electron')
*/
function createWindow() {
    var win = new BrowserWindow({
        width: 720,
        height: 564,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.webContents.openDevTools();
    win.loadFile('index.html');
}
app.whenReady().then(createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
