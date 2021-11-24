// read existing notes from local storage
const getSavedNotes = () => {
	const notesJSON = localStorage.getItem("notes");

	try {
		return notesJSON ? JSON.parse(notesJSON) : [];
	} catch (e) {
		return [];
	}
};

// generate the DOM structure for a note
const genNoteDOM = (note) => {
	const noteElement = document.createElement("a");
	const textElement = document.createElement("p");
	const statusElement = document.createElement("p");

	// setup the note title text
	if (note.title.length > 0) {
		textElement.textContent = note.title;
	} else {
		textElement.textContent = "Unnamed note";
	}
	textElement.classList.add("list-item__title");
	noteElement.appendChild(textElement);

	//link setup
	noteElement.href = `edit.html#${note.id}`;
	noteElement.classList.add("list-item");
	//status setup
	statusElement.textContent = genLastEdited(note.updatedAt);
	noteElement.appendChild(statusElement);
	statusElement.classList.add("list-item__subtitle");

	return noteElement;
};

// render application notes
const renderNotes = (notes, filters) => {
	const notesEl = document.querySelector("#notes");
	notes = sortNotes(notes, filters.sortBy);
	const filteredNotes = notes.filter((note) =>
		note.title.toLowerCase().includes(filters.searchText.toLowerCase())
	);

	notesEl.innerHTML = "";

	if (filteredNotes.length > 0) {
		filteredNotes.forEach((note) => {
			const noteElement = genNoteDOM(note);
			notesEl.appendChild(noteElement);
		});
	} else {
		const emptyMessage = document.createElement("p");
		emptyMessage.textContent = "No notes to show.";
		emptyMessage.classList.add("empty-message");
		notesEl.appendChild(emptyMessage);
	}
};

// save notes to local storage
const saveToLocal = (notes) => {
	localStorage.setItem("notes", JSON.stringify(notes));
};

// remove note from list
const removeNote = (id) => {
	const noteId = notes.findIndex((note) => note.id === id);

	if (noteId > -1) {
		notes.splice(noteId, 1);
	}
};

// generate the last edited message
const genLastEdited = (timeStamp) => {
	return `Last edited ${moment(timeStamp).fromNow()}`;
};

// sort notes
const sortNotes = (notes, sortBy) => {
	if (sortBy === "byEdited") {
		return notes.sort((a, b) => {
			return a.updatedAt > b.updatedAt ? -1 : b.updatedAt > a.updatedAt ? 1 : 0;
		});
	} else if (sortBy === "byCreated") {
		return notes.sort((a, b) => {
			return a.createdAt > b.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0;
		});
	} else if (sortBy === "alphabetical") {
		return notes.sort((a, b) => {
			return a.title.toLowerCase() < b.title.toLowerCase()
				? -1
				: b.title.toLowerCase() < a.title.toLowerCase()
				? 1
				: 0;
		});
	} else {
		return notes;
	}
};
