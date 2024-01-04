const { app, BrowserWindow, screen, globalShortcut } = require('electron');
const { ipcMain } = require('electron/main');
const { writeFile, writeFileSync, existsSync, mkdirSync, readdirSync } = require('node:fs');

const path = require('node:path'); 	// add dependencies for upload
// view https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
const isDev = process.env.NODE_ENV !== 'development'

ipcMain.handle('saveFile', saveFile);
ipcMain.handle('open-child-page', openWritingChild);
ipcMain.handle('close-write', () => {
	winChild.close();
});

function saveFile(_, { title, data }) {
	if (!title || !data) {
		// console.log("Can Not Save Undefined Data ")
		return { success: false };
	}
	const dir = path.join(__dirname, 'notes')
	const datapath = path.join(__dirname, 'notes', `${title}.txt`)
	console.log("datapath", datapath)
	let files = readdirSync(dir)
	console.log("file list", files)
	if (!existsSync(dir)) {
		mkdirSync(dir);
	}
	writeFileSync(datapath, data);
	return { success: true };
}

const createWindow = () => {
	mainWin = new BrowserWindow({
		width: 500,
		height: 250,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: false,
			nodeIntegrationInWorker: true,
			contextIsolation: isDev ? true : false,
			// devTools: true,
		},
		icon: "./assests/favicon.ico",
		autoHideMenuBar: true,
		resizable: false,
	});
	if (isDev) {
		// mainWin.webContents.openDevTools();
	}

	mainWin.loadFile("./mainPage.html");
	center = mainWin.getPosition();
	console.log(center)
}

function openWritingChild(event) {
	// if (!dir) {
	// 	return;
	// }
	let width = isDev? 1000: 400;
	let height = 500;
	let bounds = screen.getPrimaryDisplay().bounds;
	let x = bounds.x + ((bounds.width - width) / 2);
	let y = bounds.y + ((bounds.height - height) / 2);

	winChild = new BrowserWindow({
		width: width,
		height: height,
		x: x,
		y: y,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: false,
			nodeIntegrationInWorker: true,
			contextIsolation: isDev ? true : false,
		},
		icon: "./assests/favicon.ico",
		autoHideMenuBar: true,
		resizable: false,
	});
	if (isDev) {
		winChild.webContents.openDevTools();
	}
	mainWin.hide();
	winChild.loadFile("./writing_features/index.html");

	winChild.on("closed", () => {
		mainWin.show();
		
	})
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

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

// app.on('browser-window-focus', function () {
//     globalShortcut.register("Alt", () => {
//         // console.log("CommandOrControl+R is pressed: Shortcut Disabled");
// 		return false;
//     });
//     // globalShortcut.register("F5", () => {
//     //     console.log("F5 is pressed: Shortcut Disabled");
//     // });
// });

app.on('browser-window-blur', () => {
	globalShortcut.unregisterAll()
})