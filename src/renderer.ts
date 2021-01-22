//#region require
const { ipcRenderer } = require('electron')
//#endregion

//#region elements
const openRepoButton = document.getElementById('openRepoButton')
const gitResetButton = document.getElementById('gitResetButton')
const gitSetUserButton = document.getElementById('gitSetUserButton')

const repoPathElement = document.getElementById('repoPath')
const headElement = document.getElementById('head')

const usernameInput = document.getElementById('username') as HTMLInputElement
const useremailInput = document.getElementById('useremail') as HTMLInputElement
//#endregion

//#region render on startup
setHeadElement()
setUsername()
setUseremail()
//#endregion

//#region click
if (openRepoButton) {
    openRepoButton.addEventListener('click', async () => {
        const dir = await ipcRenderer.invoke('get-directory-action')
        await ipcRenderer.invoke('open-repo-action', dir)
        if (repoPathElement) {
            repoPathElement.innerHTML = dir
        }
        await setHeadElement()
    })
}

if (gitResetButton) {
    gitResetButton.addEventListener('click', async () => {
        const head = await ipcRenderer.invoke('git-reset-action', 123)
        alert('git reset button clicked: ' + head)
    })
}
if (gitSetUserButton) {
    gitSetUserButton.addEventListener('click', async () => {
        let username = usernameInput.value
        let useremail = useremailInput.value
        await ipcRenderer.invoke('git-setuser-action', username, useremail)
    })
}
//#endregion

//#region helper
async function setHeadElement() {
    const head = await ipcRenderer.invoke('get-head-action')
    if (headElement) {
        headElement.innerHTML = head
    }
}
async function setUsername() {
    if (usernameInput) {
        const username = await ipcRenderer.invoke('get-username-action')
        usernameInput.value = username;
    }
}
async function setUseremail() {
    if (useremailInput) {
        const useremail = await ipcRenderer.invoke('get-useremail-action')
        useremailInput.value = useremail;
    }
}
//#endregion
