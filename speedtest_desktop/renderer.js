const {shell} = require('electron')
const {webContents} = require('electron')
const {remote} = require('electron')

if (process.platform == 'darwin') {
    document.querySelector(".close").outerHTML = ""
}


document.querySelector(".close").addEventListener("click", function (event) {
    remote.app.quit()
}, true);

document.querySelector(".info").addEventListener("click", function (event) {
    remote.getCurrentWindow().reload();
}, true);

document.querySelector(".legend>a").addEventListener("click", function (event) {
    shell.openItem('http://www.speedtest.net/')
}, true);   