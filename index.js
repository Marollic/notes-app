let notes = [
  {
    id: null,
    title: null,
    body: null,
    bgColor: null,
  },
];

let edit = { state: false, noteEd: {} };

const createElement = (tag, classes = []) => {
  const element = document.createElement(tag);
  classes.forEach((cl) => {
    element.classList.add(cl);
  });
  return element;
};

const createNoteView = (note) => {
  const noteDiv = createElement("div", ["note"]);
  noteDiv.id = note.id;
  const textDiv = createElement("div", ["text"]);
  textDiv.style.background = note.bgColor;
  const titleP = createElement("b", ["title"]);
  titleP.innerHTML = note.title;
  const bodyP = createElement("p", ["body"]);
  bodyP.innerHTML = note.body;
  const editButton = createElement("button", ["edit"]);
  editButton.innerHTML = "Edit note";
  const deleteButton = createElement("button", ["delete"]);
  deleteButton.innerHTML = "Delete note";
  textDiv.append(titleP);
  textDiv.append(bodyP);
  noteDiv.append(textDiv);
  noteDiv.append(editButton);
  noteDiv.append(deleteButton);
  deleteButton.onclick = () => deleteNotes(noteDiv);
  editButton.onclick = () => editNotes(noteDiv);
  return noteDiv;
};

const saveNote = () => {
  const titleInput = document.querySelector("input#title");
  const bodyInput = document.querySelector("input#body");
  const bgColorInput = document.querySelector("select");
  if (edit.state == false) {
    const id = new Date().getTime();
    const note = {
      id,
      title: titleInput.value,
      body: bodyInput.value,
      bgColor: bgColorInput.value,
    };
    const noteDiv = createNoteView(note);
    notesDiv.append(noteDiv);
  } else {
    edit.noteEd.querySelector("b.title").innerHTML = titleInput.value;
    edit.noteEd.querySelector("p.body").innerHTML = bodyInput.value;
    edit.noteEd.querySelector(".text").style.background = bgColorInput.value;
    document.querySelector("button.add").innerHTML = "Add Note"
    edit = { state: false, noteEd: {} };
  }
  titleInput.value = "";
  bodyInput.value = "";
  bgColorInput.value = "";
};

const deleteNotes = (noteDiv) => {
  notesDiv.remove(noteDiv);
  notes = notes.filter(note => note.id != noteDiv.id);
  edit = { state: false, noteEd: {} };
};

const editNotes = (noteDiv) => {
  document.querySelector("input#title").value =
    noteDiv.querySelector("b.title").innerHTML;
  document.querySelector("input#body").value =
    noteDiv.querySelector("p.body").innerHTML;
  document.querySelector("select").value =
    noteDiv.querySelector(".text").background;
  edit = { state: true, noteEd: noteDiv };
  document.querySelector("button.add").innerHTML = "Save Edit";
  document.querySelector("input#title").focus();
};

document.querySelector("button.add").onclick = () => saveNote();

const notesDiv = document.querySelector(".notesDiv");

notes.forEach((note) => {
  if (note.id != null || note.id != undefined) {
    const noteDiv = createNoteView(note);
    notesDiv.append(noteDiv);
  }
});
