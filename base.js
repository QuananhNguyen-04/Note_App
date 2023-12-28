const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron/main');
const { writeFile, writeFileSync, existsSync, mkdirSync } = require('node:fs');

const path = require('node:path'); 	// add dependencies for upload
// view https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
const isDev = process.env.NODE_ENV !== 'development'

ipcMain.handle('saveFile', saveFile);
ipcMain.handle('open-child-page', openWritingChild);
ipcMain.handle('close-write', () => { 
	mainWin.show();
	winChild.close();
	// console.log(mainWin.show)
})

let mainWin, winChild;
var center = null;
const createWindow = () => {
	mainWin = new BrowserWindow({
		x: center? center[0]: null,
		y: center? center[1]: null,
		width: isDev ? 500 : 400,
		height: 300,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: false,
			nodeIntegrationInWorker: true,
			contextIsolation: isDev ? true : false,
		}
	});
	if (isDev) {
		// mainWin.webContents.openDevTools();
	}
	// ipcMain.handle('saveFile', saveFile);
	// ipcMain.handle('open-child-page', openWritingChild);
	mainWin.loadFile("./mainPage.html");
	center = mainWin.getPosition();
	console.log(center)
}

function openWritingChild(event) {
	// if (!dir) {
	// 	return;
	// }
	console.log("in basejs");
	winChild = new BrowserWindow({
		parent: mainWin,
		width: isDev ? 600 : 400,
		height: 500,
		x: center? center[0] - (isDev? 100: 100): null,
		y: center? center[1] - 200: null,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: false,
			nodeIntegrationInWorker: true,
			contextIsolation: isDev ? true : false,
		}
	});
	// ipcMain.handle()
	event = event || window.event;
	event.preventDefault();
	mainWin.setAlwaysOnTop(true, 'screen-saver');
	mainWin.hide();
	winChild.loadFile("./writing_features/index.html");
	winChild.show();
	winChild.on("closed", () => {
		mainWin.show();
		console.log(mainWin.show)
	})
	// winChild.on("closed", () => {
	// 	if (mainWin.on("hide", _) 
	// 	&& BrowserWindow.getAllWindows().length() === 1 
	// 	&& process.platform !== 'darwin') 

	// 		app.quit();
	// })
	// window.location.assign('./writing_features/index.html')
}


app.whenReady().then(() => {
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length() === 0) createWindow();
	});

	mainWin.webContents.on('did-finish-load', () => {
		mainWin.webContents.send('app-ready');
	});
})

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
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})