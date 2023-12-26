const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron/main');
const { writeFile, writeFileSync, existsSync, mkdirSync } = require('node:fs');

const path = require('node:path'); 	// add dependencies for upload
									// view https://www.electronjs.org/docs/latest/tutorial/tutorial-preload

const createWindow = () => {
	const win = new BrowserWindow ({
		width: 400,
		height: 500,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			// nodeIntegration: true,
		}
	});
	ipcMain.handle('saveFile', saveFile)
	win.loadFile("./index.html");
}


// const information = 
function saveFile(_, {title, data}) {
	if (!title || !data) {
		console.log("Can Not Save Undefined Data ")
		return {success: false};
	}
	const dir = path.join(__dirname, 'notes')
	const datapath = path.join(__dirname , 'notes', `${title}.txt`)
	if (!existsSync(dir)) {
		mkdirSync(dir);
	}
	writeFileSync(datapath, data);
	return {success: true};
}

app.whenReady().then(() => {
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length() === 0) createWindow();
	})
})
ipcMain.on('dirName', saveFile) 

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})