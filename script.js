"use strict";

const addButton = document.querySelector(".add-button");
const form = document.querySelector("form");
const closeForm = document.querySelector(".close-form");
const books = document.querySelector(".books");
let id = 1;

const toggleForm = function () {
  form.classList.toggle("hidden");
  books.classList.toggle("hidden");
  addButton.classList.toggle("hidden");
};

const toggleRead = function (event) {
  event.target.classList.toggle("read");
  const book = event.target.parentElement;
  book.classList.toggle("read");
  toggleReadButtonContent(book);
};

const toggleReadButtonContent = (book) => {
  const button = book.querySelector(".read-button");
  button.textContent =
    button.textContent.toLowerCase() === "not read yet"
      ? "Already Read"
      : "Not Read Yet";
};

books.addEventListener("click", (event) => {
  if (event.target.classList.contains("read-button")) {
    toggleRead(event);
  }
});

books.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-book")) {
    removeBook(event);
  }
});

const removeBook = function (event) {
  myLibrary.splice(
    myLibrary.findIndex(
      (book) => book.id === Number(event.target.parentElement.dataset.id)
    ),
    1
  );
  displayBooks();
};

addButton.addEventListener("click", toggleForm);

closeForm.addEventListener("click", toggleForm);
form.addEventListener("submit", (e) => {
  addBook(e);
});

const myLibrary = [];

function Book(title, author, pages, description, id, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.description = description;
  this.id = id;
  this.isRead = isRead;
}

function displayBook(book) {
  const html = `
      <div class="book ${book.isRead === "read" ? "read" : ""}" data-id='${
    book.id
  }'>
        <h2 class="title ">
          ${book.title} By ${book.author}, ${book.pages} pages
        </h2>
        <p class="description">${book.description}</p>
        <button class="read-button ">${
          book.isRead === "read" ? "Already Read" : "Not Read Yet"
        }</button>
        <button class="remove-book">X</button>
      </div>
    `;
  books.insertAdjacentHTML("beforeend", html);
}

function addBook(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const newBook = new Book(
    data.title,
    data.author,
    data.pages,
    data.description,
    id,
    data["is-read"]
  );
  myLibrary.push(newBook);
  displayBook(newBook);
  toggleForm();
  form.reset();
  id++;
}

const displayBooks = function () {
  books.innerHTML = "";
  myLibrary.forEach((book) => {
    const html = `
    <div class="book ${book.isRead === "read" ? "read" : ""}" data-id=${
      book.id
    }>
      <h2 class="title ">
        ${book.title} By ${book.author}, ${book.pages} pages
      </h2>
      <p class="description">${book.description}</p>
      <button class="read-button ">${
        book.isRead === "read" ? "Already Read" : "Not Read Yet"
      }</button>
      <button class="remove-book">X</button>
    </div>
  `;
    books.insertAdjacentHTML("beforeend", html);
  });
};
