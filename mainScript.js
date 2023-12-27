// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

console.log("in main")

const directWrite = document.getElementById('writing')

function openWritingPage() {
	console.log("go to writing page");
	window.location.assign('./writing_features/index.html');
	// history.pushState({}, '', './writing_features/index.html');
	// openPage.open("./writing_features/index.html")
}


directWrite.addEventListener('click', openWritingPage)

// saveBtn.addEventListener('submit', function() {
// 	localStorage.setItem('newNote', newNote.ariaValueNow);
// });