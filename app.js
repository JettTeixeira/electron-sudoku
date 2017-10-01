const Electron = require('electron');
const Path = require('path');
const Url = require('url');

// Manage application life
const app = Electron.app;

// Make global, garbage collector can delete the var and the windows gonna be closed
let mainWindow = null;

// Create window function ^^
function createWindow() {

    // Create window
    mainWindow = new Electron.BrowserWindow({width: 800, height: 620, minWidth: 800, minHeight: 620, maxWidth: 800, maxHeight: 620, title:"SuDoKu"});

    // Load the html
    mainWindow.loadURL(Url.format({
        pathname: Path.join(__dirname, 'src/main.html'),
        protocol: 'file',
        slashes: true
    }));

    // When window closed, delete it.
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// When electron is loaded, execute the function
app.on('ready', createWindow);

// When all windows are closed
app.on('window-all-closed', () => {

    // On OS X its common stay active until the users quits explicitly
    if (process.plataform !== 'darwin')
        app.quit();
});


// OS X event, Various acctions can trigger it (See docs: https://github.com/electron/electron/blob/master/docs/api/app.md#event-activate-macos)
app.on('active', () => {

    // Recreate the window in case of null
    if (mainWindow === null)
        createWindow();
});