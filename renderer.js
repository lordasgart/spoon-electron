"use strict";
const { ipcRenderer } = require('electron');
const openRepoButton = document.getElementById('openRepoButton');
const gitResetButton = document.getElementById('gitResetButton');
const repoPathElement = document.getElementById('repoPath');
const headElement = document.getElementById('head');
const usernameInput = document.getElementById('username');
const useremailInput = document.getElementById('useremail');
setHeadElement();
setUsername();
setUseremail();
if (openRepoButton) {
    openRepoButton.addEventListener('click', async () => {
        const dir = await ipcRenderer.invoke('get-directory-action');
        await ipcRenderer.invoke('open-repo-action', dir);
        if (repoPathElement) {
            repoPathElement.innerHTML = dir;
        }
        await setHeadElement();
    });
}
if (gitResetButton) {
    gitResetButton.addEventListener('click', async () => {
        const head = await ipcRenderer.invoke('git-reset-action', 123);
        alert('git reset button clicked: ' + head);
    });
}
async function setHeadElement() {
    const head = await ipcRenderer.invoke('get-head-action');
    if (headElement) {
        headElement.innerHTML = head;
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
//# sourceMappingURL=renderer.js.map