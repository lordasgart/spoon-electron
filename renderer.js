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
setHeadElement();
setPathElement();
setUsername();
setUseremail();
if (openRepoButton) {
    openRepoButton.addEventListener('click', async () => {
        const dir = await ipcRenderer.invoke('get-directory-action');
        const path = await ipcRenderer.invoke('get-path-action');
        await ipcRenderer.invoke('open-repo-action', dir);
        if (repoDirElement) {
            repoDirElement.innerHTML = dir;
        }
        if (repoPathElement) {
            repoPathElement.innerHTML = path;
        }
        await setHeadElement();
    });
}
if (gitResetButton) {
    gitResetButton.addEventListener('click', async () => {
        await ipcRenderer.invoke('git-reset-action');
    });
}
if (gitSetUserButton) {
    gitSetUserButton.addEventListener('click', async () => {
        let username = usernameInput.value;
        let useremail = useremailInput.value;
        await ipcRenderer.invoke('git-setuser-action', username, useremail);
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
//# sourceMappingURL=renderer.js.map