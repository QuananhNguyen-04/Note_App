const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
	'versions', {
		node: () => process.versions.node,
		chrome: () => process.versions.chrome,
		electron: () => process.versions.electron,
		// we can also expose variables, not just functions
});
contextBridge.exposeInMainWorld(
	'dataFeature', {
		createFile: (title, data) => {
			// console.log("in preload.js")
			// console.log(title, data);
			return ipcRenderer.invoke('saveFile', { title, data })
		}
});
contextBridge.exposeInMainWorld(
	'openPage', {
		openWriting: () => {
			console.log("in preload")
			ipcRenderer.on('app-ready', ipcRenderer.invoke('open-child-page'));
		},
		openDrawing: () => {
			console.log("in preload")
		}
});
contextBridge.exposeInMainWorld(
	'closePage', {
		closeWrite: () => {
			console.log("in preload")
			// ipcRenderer.on('app-ready', ipcRenderer.invoke('open-child-page'));
			ipcRenderer.invoke("close-write")
		},
		openDrawing: () => {
			console.log("in preload")
		}
});
