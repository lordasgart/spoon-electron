// In the Renderer process
const { ipcRenderer } = require('electron')

const openRepoButton = document.getElementById('openRepoButton')
const gitResetButton = document.getElementById('gitResetButton')

if (openRepoButton)
{
    openRepoButton.addEventListener('click', async () => {
        const dir = await ipcRenderer.invoke('open-repo-action', 1234)
            //alert('openRepoButton: ' + dir)
            console.log(dir)
        })
}

if (gitResetButton)
{
    gitResetButton.addEventListener('click', async () => {
    const head = await ipcRenderer.invoke('git-reset-action', 123)
        alert('git reset button clicked: ' + head)
    })
}


