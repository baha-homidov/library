const addBookButton = document.querySelector(".add-book");
const addBookWindow = document.querySelector(".add-book-window");
const addEntryButton = document.querySelector(".submit");
const bookTitleInput = document.querySelector("#title");
const bookAuthorInput = document.querySelector("#author");
const bookPageNumInput = document.querySelector("#page-num");
const isReadSwith = document.querySelector(".add-is-read");
const addEntryForm = document.querySelector("form");
const bookGrid = document.querySelector(".book-grid");
const clearLiraryButton = document.querySelector("button.clear-library");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pageNumInput = document.getElementById("page-num");

function checkInput() {
  titleInput.checkValidity();
  authorInput.checkValidity();
  pageNumInput.checkValidity();
  return (
    titleInput.validity.valid &&
    authorInput.validity.valid &&
    pageNumInput.validity.valid
  );
}

authorInput.addEventListener("input", () => {
    authorInput.setCustomValidity("");
    authorInput.checkValidity();
})

pageNumInput.addEventListener("input", () => {
    pageNumInput.setCustomValidity("");
    pageNumInput.checkValidity();
})

titleInput.addEventListener("input", () => {
    titleInput.setCustomValidity("");
    titleInput.checkValidity();
})


function showError() {
    if (!titleInput.validity.valid) {
        titleInput.setCustomValidity("Add the book name!");
        titleInput.reportValidity();
    }
    if (!authorInput.validity.valid) {
        authorInput.setCustomValidity("Add the author name!");
        authorInput.reportValidity();
    }
    if (!pageNumInput.validity.valid) {
        pageNumInput.setCustomValidity("Input the number of pages!");
        pageNumInput.reportValidity();
    }
}


addEntryForm.addEventListener("submit", (event) => {
  if (checkInput()) {
    console.log("success");
    addBookToLibrary();
    event.preventDefault();
  } else {
    if (!titleInput.validity.valid) {
        titleInput.setCustomValidity("Add the book name!");
        titleInput.reportValidity();
    }
    if (!authorInput.validity.valid) {
        authorInput.setCustomValidity("Add the author name!");
        authorInput.reportValidity();
    }
    if (!pageNumInput.validity.valid) {
        pageNumInput.setCustomValidity("Input the number of pages!");
        pageNumInput.reportValidity();
    }
      event.preventDefault();
    }
  
});

clearLiraryButton.addEventListener("click", () => {
  cleanBookGrid();
  myLibrary = [];
});

class Book {
  constructor(title, author, pageNum, isRead) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = Boolean(isRead);
  }
}

let myLibrary = [];

addBookButton.addEventListener("click", () => {
  addBookWindow.classList.remove("hide");
});

function cleanBookGrid() {
  let first = bookGrid.firstElementChild;
  while (first) {
    first.remove();
    first = bookGrid.firstElementChild;
  }
}

function reFillBookGrid() {
  cleanBookGrid();
  for (let i = 0; i < myLibrary.length; i++) {
    addBookEntry(myLibrary[i], i);
  }
}

function addBookEntry(newBook, index) {
  let bookEntry = document.createElement("div");
  bookEntry.classList.add("book-entry");

  bookEntry.setAttribute("array-index", index);

  let titleDiv = document.createElement("div");
  titleDiv.classList.add("title");
  titleDiv.appendChild(document.createTextNode(newBook.title));

  let byDiv = document.createElement("div");
  byDiv.classList.add("by");
  byDiv.appendChild(document.createTextNode("by"));

  let authorDiv = document.createElement("div");
  authorDiv.classList.add("author");
  authorDiv.appendChild(document.createTextNode(newBook.author));

  let pagesDiv = document.createElement("div");
  pagesDiv.classList.add("pages");
  pagesDiv.appendChild(document.createTextNode(`Pages: ${newBook.pageNum}`));

  //is read toggle
  let isReadDiv = document.createElement("div");
  isReadDiv.classList.add("is-read");
  let isReadSpanText = document.createElement("span");
  isReadSpanText.appendChild(document.createTextNode("Has been read"));
  isReadSpanText.classList.add("text");
  let bookEntryIsRead = document.createElement("label");
  bookEntryIsRead.classList.add("switch");
  let isReadCheckbox = document.createElement("input");
  if (newBook.isRead) {
    isReadCheckbox.checked = true;
  }
  isReadCheckbox.type = "checkbox";
  isReadCheckbox.classList.add();
  let isReadSlider = document.createElement("span");
  isReadSlider.classList.add("slider");
  isReadSlider.classList.add("round");
  bookEntryIsRead.appendChild(isReadCheckbox);
  bookEntryIsRead.appendChild(isReadSlider);
  isReadDiv.appendChild(isReadSpanText);
  isReadDiv.appendChild(bookEntryIsRead);

  bookEntry.appendChild(titleDiv);
  bookEntry.appendChild(byDiv);
  bookEntry.appendChild(authorDiv);
  bookEntry.appendChild(pagesDiv);
  bookEntry.appendChild(isReadDiv);
  //--------------------------------

  let deleteBookButton = document.createElement("button");
  deleteBookButton.classList.add("delete");
  deleteBookButton.appendChild(document.createTextNode("Delete book"));
  bookEntry.appendChild(deleteBookButton);

  bookGrid.appendChild(bookEntry);

  const deleteEntryButton = document.querySelectorAll("button.delete");
  for (let i = 0; i < deleteEntryButton.length; i++) {
    deleteEntryButton[i].addEventListener("click", () => {
      myLibrary.splice(
        document
          .querySelector("button.delete")
          .parentNode.getAttribute("array-index"),
        1
      );
      reFillBookGrid();
    });
  }
}

function addBookToLibrary() {
  let newBook = new Book(
    bookTitleInput.value,
    bookAuthorInput.value,
    bookPageNumInput.value,
    isReadSwith.checked
  );
  myLibrary.push(newBook);
  addBookEntry(newBook, myLibrary.length - 1);

  addEntryForm.reset();
  addBookWindow.classList.add("hide");
}
