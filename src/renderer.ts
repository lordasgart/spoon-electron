//#region require
const { ipcRenderer } = require('electron')
//#endregion

//#region elements
const openRepoButton = document.getElementById('openRepoButton')
const gitResetButton = document.getElementById('gitResetButton')

const repoPathElement = document.getElementById('repoPath')
const headElement = document.getElementById('head')
//#endregion

//#region render on startup
setHeadElement();
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
//#endregion

//#region helper
async function setHeadElement() {
    const head = await ipcRenderer.invoke('get-head-action')
    if (headElement) {
        headElement.innerHTML = head
    }
}
//#endregion
