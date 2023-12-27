const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron/main');
const { writeFile, writeFileSync, existsSync, mkdirSync } = require('node:fs');

const path = require('node:path'); 	// add dependencies for upload
// view https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
const isDev = process.env.NODE_ENV !== 'development'

const createWindow = () => {
	const win = new BrowserWindow({
		width: isDev ? 1000 : 400,
		height: isDev ? 700 : 500,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: false,
			nodeIntegrationInWorker: true,
			contextIsolation: isDev ? true : false,
		}
	});
	if (isDev) {
		win.webContents.openDevTools();
	}
	ipcMain.handle('saveFile', saveFile);
	// ipcMain.handle('openPage', createSub);
	win.loadFile("./mainPage.html");
}

// function createSub() {
// 	// if (!dir) {
// 	// 	return;
// 	// }
// 	window.location.assign('./writing_features/index.html')
// }

function saveFile(_, { title, data }) {
	if (!title || !data) {
		// console.log("Can Not Save Undefined Data ")
		return { success: false };
	}
	const dir = path.join(__dirname, 'notes')
	const datapath = path.join(__dirname, 'notes', `${title}.txt`)
	if (!existsSync(dir)) {
		mkdirSync(dir);
	}
	writeFileSync(datapath, data);
	return { success: true };
}

app.whenReady().then(() => {
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length() === 0) createWindow();
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})