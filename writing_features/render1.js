// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

var annouce = document.getElementById('notice');
const noteTitle = document.getElementById('noteTitle');
const noteData = document.getElementById('noteData');
const btn = document.getElementById("saveBtn");
const homeBtn = document.getElementById("imgHome");
const wrapper_dropdown = document.getElementById("wrapper_dropdown")
const color_dropdown = document.getElementById("color_dropdown")
const navSideBar = document.getElementById("sidenav")
const mainContent = document.getElementById("mainContent")
var bool = false;

color_dropdown.addEventListener('mouseover', function() { 
	noteTitle.style.zIndex = -1
	noteData.style.zIndex = -1
	this.style.zIndex = 999
	wrapper_dropdown.style.overflow = "visible"
	color_dropdown.focus();
});

navSideBar.addEventListener('mouseover', function () {
	wrapper_dropdown.focus();
	mainContent.style.zIndex=-1
});
navSideBar.addEventListener('mouseout', function() {
	wrapper_dropdown.style.overflow = "hidden"
	mainContent.style.zIndex = "auto"
});

homeBtn.addEventListener("click", backHomePage);
noteTitle.addEventListener("paste", (evt) => {
	var elt = evt.target;
	elt = elt.replace("<br>", ' ')

});
noteTitle.addEventListener("keypress", (e) => {
	let key = (e.key).toString();
	let code = "Enter";
	if (key === code) {
		e.preventDefault();
	}
})
function backHomePage() {
	console.log("Returning");
	// window.location.assign("../mainPage.html")
	// openPage.open();
	// app.quit();
	closePage.closeWrite();
}

btn.addEventListener("click", saveNote);
async function saveNote(event) {
	const title = noteTitle.innerHTML;
	const data = noteData.innerHTML;

	const res = (await dataFeature.createFile(title, data)).success;
	// title and data parameters must be have same name with base.js function
	if (res) {
		annouce.style.visibility = "visible";
		annouce.innerText = "Save Successfully";
		annouce.style.background = "green";
	}
	else {
		annouce.style.visibility = "visible";
		annouce.innerText = "Save Failed. Please fill every fields.";
		annouce.style.background = "red";
	}
}

var color_btn = document.getElementsByClassName("color-btn")
function changeTextColor(btn) {
	noteData.style.color = btn.style.background_color;
}

function clickColorBtn() {
	for (var i = 0; i < color_btn.length; ++i) {
		color_btn[i].addEventListener('click', changeTextColor)
		console.log("ABC Click Color")
	}
}