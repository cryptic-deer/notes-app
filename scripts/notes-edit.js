"use strict";
const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const removeElement = document.querySelector("#remove-note");
const dateElement = document.querySelector("#last-edited");

const noteId = location.hash.substring(1); //cutting the # off of the id hash
let notes = getSavedNotes();

let note = notes.find((note) => note.id === noteId);

//checking if the note exist
if (!note) {
	location.assign("index.html");
}

//load note elements into boxes
titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = genLastEdited(note.updatedAt);

//events upon typing
titleElement.addEventListener("input", (e) => {
	note.title = e.target.value;
	note.updatedAt = moment().valueOf();
	dateElement.textContent = genLastEdited(note.updatedAt);
	saveToLocal(notes);
});
bodyElement.addEventListener("input", (e) => {
	note.body = e.target.value;
	note.updatedAt = moment().valueOf();
	dateElement.textContent = genLastEdited(note.updatedAt);
	saveToLocal(notes);
});

//remove note
removeElement.addEventListener("click", (e) => {
	removeNote(note.id);
	saveToLocal(notes);
	location.assign("index.html");
});

//live connection, to work if there are multiple windows open of the same page
window.addEventListener("storage", (e) => {
	if (e.key === "notes") {
		notes = JSON.parse(e.newValue);
		note = notes.find((note) => {
			return note.id === noteId;
		});

		//checking if the note exist
		if (!note) {
			location.assign("index.html");
		}

		//load note elements into boxes
		titleElement.value = note.title;
		bodyElement.value = note.body;
		dateElement.textContent = genLastEdited(note.updatedAt);
	}
});
