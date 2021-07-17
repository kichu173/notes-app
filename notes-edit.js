'use strict'

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(note => {
    return note.id === noteId;
})
const findNote = notes.findIndex(note => {
    return note.id === noteId;
})

if (!note) { // note === undefined
    location.assign('/index.html');
}

document.querySelector('#note-title').value = note.title;
document.querySelector('#note-body').value = note.body;
document.querySelector('#last-edited').textContent = generateLastEdited(moment(notes[findNote].updatedAt));

document.querySelector("#note-title").addEventListener("input", (e) => {
  notes[findNote].title = e.target.value;
  notes[findNote].updatedAt = moment().valueOf();
  document.querySelector('#last-edited').textContent = generateLastEdited(moment(notes[findNote].updatedAt));
  saveNotes(notes);
});

document.querySelector("#note-body").addEventListener("input", (e) => {
  notes[findNote].body = e.target.value;
  notes[findNote].updatedAt = moment().valueOf();
  document.querySelector('#last-edited').textContent = generateLastEdited(moment(notes[findNote].updatedAt));
  saveNotes(notes);
});

document.querySelector("#remove-button").addEventListener("click", (e) => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("/index.html");
})

window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    note = notes.find((note) => {
      return note.id === noteId;
    });

    if (!note) { // note === undefined
      location.assign("/index.html");
    }
    document.querySelector("#note-title").value = note.title;
    document.querySelector("#note-body").value = note.body;
    document.querySelector('#last-edited').textContent = generateLastEdited(moment(notes[findNote].updatedAt));
  }
});

// const date = new Date('Jan 8 2000 6:00:00');
// const timeStamp = date.getTime();
// const date1 = new Date('Feb 8 2000 6:00:00');
// const timeStamp1 = date1.getTime();
// if (timeStamp > timeStamp1) {
//   const myDate = new Date(timeStamp);
//   console.log(`Time: ${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`);
// } else {
//   const myDate = new Date(timeStamp1);
//   console.log(`Time: ${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`);
// }

// moment

// const date = moment();
// date.month(2).date(17).year(1997);
// console.log(date.toString());
// console.log(date.format('MMM D, YYYY'));
