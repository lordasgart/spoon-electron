//#region require
const { ipcRenderer } = require('electron')
//#endregion

//#region elements
const openRepoButton = document.getElementById('openRepoButton')
const gitResetButton = document.getElementById('gitResetButton')
//#endregion

//#region click
if (openRepoButton) {
    openRepoButton.addEventListener('click', async () => {
        const dir = await ipcRenderer.invoke('get-directory-action')
        alert('openRepoButton: ' + dir)
        const head = await ipcRenderer.invoke('open-repo-action', dir)
        alert('openRepoButton head: ' + head)
    })
}

if (gitResetButton) {
    gitResetButton.addEventListener('click', async () => {
        const head = await ipcRenderer.invoke('git-reset-action', 123)
        alert('git reset button clicked: ' + head)
    })
}
//#endregion
