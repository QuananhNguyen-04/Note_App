const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
	// we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('dataFeature', {
	createFile: (title, data) => {
		// console.log("in preload.js")
		// console.log(title, data);
		return ipcRenderer.invoke('saveFile', { title, data })
	}
});

// contextBridge.exposeInMainWorld('openPage', {
// 	open: () => {
// 		return ipcRenderer.invoke('openPage');
// 	}
// });