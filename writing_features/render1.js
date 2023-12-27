// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

var annouce = document.getElementById('notice')
const noteTitle = document.getElementById('noteTitle')
const noteData = document.getElementById('noteData')
const btn = document.getElementById("saveBtn")
const homeBtn = document.getElementById("homePage")

homeBtn.addEventListener("click", backHomePage)

function backHomePage() {
	console.log("Returning")
	// window.location.assign("../mainPage.html")
	openPage.open();
}

btn.addEventListener("click", saveNote);
async function saveNote(event) {
	const title = noteTitle.value;
	const data = noteData.value;
	console.log("click!");
	console.log("in feature.js");
	console.log(title, data);
	const res = (await dataFeature.createFile(title, data)).success;
	// title and data parameters must be have same name with base.js function
	if (res) {
		annouce.style.visibility = "visible";
		annouce.innerText = "Save Successfully"
	}
	else {
		annouce.style.visibility = "visible";
		annouce.innerText = "Cannot Save. Please fill every fields."
	}
}
// saveBtn.addEventListener('submit', function() {
// 	localStorage.setItem('newNote', newNote.ariaValueNow);
// });