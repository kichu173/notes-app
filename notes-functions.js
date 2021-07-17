"use strict";

// Read existing notes from localStorage
const getSavedNotes = function () {
  const notesJSON = localStorage.getItem("notes");
  try {
    // try -catch to handle if invalid data in local storage
    if (notesJSON) {
      // (notesJSON !== null)
      return JSON.parse(notesJSON);
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};

// Save the notes to localStorage
const saveNotes = function (notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Remove a note from the list
const removeNote = function (id) {
  const noteIndex = notes.findIndex(function (note) {
    return note.id === id;
  });

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// Generate the DOM structure for a note
const generateNoteDOM = function (note) {
  const noteEl = document.createElement("a"); //div
  const textEl = document.createElement("p"); // a
  const statusEl = document.createElement("p");
  // const button = document.createElement("button");

  // // Setup the remove note button
  // button.textContent = "x";
  // noteEl.appendChild(button);
  // button.addEventListener("click", function () {
  //   removeNote(note.id);
  //   saveNotes(notes);
  //   renderNotes(notes, filters);
  // });

  // Setup the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  textEl.classList.add('list-item__title')
  noteEl.appendChild(textEl);
  // textEl.setAttribute("href", `/edit.html#${note.id}`);
  // Setup the link
  noteEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.classList.add('list-item');
  
  // setup the status message
  statusEl.textContent = generateLastEdited(note.updatedAt)
  statusEl.classList.add('list-item__subtitle');
  noteEl.appendChild(statusEl);

  return noteEl;
};

// sort notes based on available dropdown list
const sortNotes = function (notes, sortBy) {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetical") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

// Render application notes
const renderNotes = function (notes, filters) {
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter(function (note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  document.querySelector("#notes").innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach(function (note) {
      const noteEl = generateNoteDOM(note);
      document.querySelector("#notes").appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes to show";
    emptyMessage.classList.add('empty-message');
    document.querySelector("#notes").appendChild(emptyMessage);
  }
};

// Generate the last edited message
const generateLastEdited = function (timeStamp) {
  return `Last edited ${moment(timeStamp).fromNow()}`;
};
