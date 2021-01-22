"use strict";
const openRepoButton = document.getElementById('openRepoButton');
const gitResetButton = document.getElementById('gitResetButton');
if (gitResetButton) {
    gitResetButton.addEventListener('click', () => {
        alert('git reset button clicked');
    });
}
//# sourceMappingURL=renderer.js.map