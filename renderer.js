const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

// const { ipcRenderer } = require('electron')

const annouce = document.getElementById('notice')

document.getElementById("saveBtn").addEventListener("click", saveNote);

async function saveNote() {
	const title = document.getElementById('noteTitle').value;
	const data = document.getElementById('noteData').value;
	console.log("click!");
	console.log("in feature.js");
	console.log(title, data);
	const res = (await dataFeature.createFile(title, data)).success;
	
	if (res) {
		annouce.style.visibility = "visible";
		annouce.innerText = "Save Successfully"
	}
	else {
		annouce.style.visibility = "visible";
		annouce.innerText = "Cannot Save"
	}
}
// saveBtn.addEventListener('submit', function() {
// 	localStorage.setItem('newNote', newNote.ariaValueNow);
// });