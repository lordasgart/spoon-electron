// In the Renderer process
const { ipcRenderer } = require('electron')

const openRepoButton = document.getElementById('openRepoButton')
const gitResetButton = document.getElementById('gitResetButton')

if (gitResetButton)
{
    gitResetButton.addEventListener('click', async () => {
    const head = await ipcRenderer.invoke('git-reset-action', 123)
        alert('git reset button clicked: ' + head)
    })
}
