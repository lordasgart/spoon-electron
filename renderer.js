"use strict";
const { ipcRenderer } = require('electron');
const openRepoButton = document.getElementById('openRepoButton');
const gitResetButton = document.getElementById('gitResetButton');
const gitSetUserButton = document.getElementById('gitSetUserButton');
const repoDirElement = document.getElementById('repoDir');
const repoPathElement = document.getElementById('repoPath');
const headElement = document.getElementById('head');
const usernameInput = document.getElementById('username');
const useremailInput = document.getElementById('useremail');
const statusElement = document.getElementById('status');
setHeadElement();
setPathElement();
setUsername();
setUseremail();
setStatus();
if (openRepoButton) {
    openRepoButton.addEventListener('click', async () => {
        const dir = await ipcRenderer.invoke('get-directory-action');
        await ipcRenderer.invoke('open-repo-action', dir);
        if (repoDirElement) {
            repoDirElement.innerHTML = dir;
        }
        await setHeadElement();
        await setPathElement();
        await setUsername();
        await setUseremail();
        await setStatus();
    });
}
if (gitResetButton) {
    gitResetButton.addEventListener('click', async () => {
        await ipcRenderer.invoke('git-reset-action');
        alert('Do not trash, always stash!');
    });
}
if (gitSetUserButton) {
    gitSetUserButton.addEventListener('click', async () => {
        let username = usernameInput.value;
        let useremail = useremailInput.value;
        await ipcRenderer.invoke('git-setuser-action', username, useremail);
        alert('User info saved successfully!');
    });
}
async function setHeadElement() {
    const head = await ipcRenderer.invoke('get-head-action');
    if (headElement) {
        headElement.innerHTML = head;
    }
}
async function setPathElement() {
    const path = await ipcRenderer.invoke('get-path-action');
    if (repoPathElement) {
        repoPathElement.innerHTML = path;
    }
}
async function setUsername() {
    if (usernameInput) {
        const username = await ipcRenderer.invoke('get-username-action');
        usernameInput.value = username;
    }
}
async function setUseremail() {
    if (useremailInput) {
        const useremail = await ipcRenderer.invoke('get-useremail-action');
        useremailInput.value = useremail;
    }
}
async function setStatus() {
    if (statusElement) {
        const repostatus = await ipcRenderer.invoke('git-getstatus-action');
        statusElement.innerHTML = repostatus;
    }
}
//# sourceMappingURL=renderer.js.map