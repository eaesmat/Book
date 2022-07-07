const form = document.getElementById('form');
let books = JSON.parse(localStorage.getItem('books'));
// add class
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  newBook() {
    const { title, author, id } = this;
    const bookList = { title, author, id };
    books = JSON.parse(localStorage.getItem('books'));
    if (title === '' || author === '') {
      document.getElementById('error').innerHTML = 'Required';
    } else if (books !== null) {
      books.push(bookList);
      localStorage.setItem('books', JSON.stringify(books));
      books = JSON.parse(localStorage.getItem('books'));
    } else {
      books = [];
      books.push(bookList);
      localStorage.setItem('books', JSON.stringify(books));
      books = JSON.parse(localStorage.getItem('books'));
    }
  }

  // remove
  remove() {
    const { id } = this;
    books = books.filter((book) => {
      if (book.id === id) {
        return false;
      }
      return true;
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// books
function displayBooks(title, author, id) {
  const bookList = document.querySelector('.all-book');
  const items = document.createElement('li');
  items.innerHTML += `
  <div class="title-div"><td><q>${title} </q> by ${author}</td>
  </div>
     `;
  const Rbtn = document.createElement('button');
  Rbtn.textContent = 'Remove';
  Rbtn.className = 'Rbtn';
  items.appendChild(Rbtn);
  bookList.appendChild(items);

  Rbtn.addEventListener('click', () => {
    const book = new Book(title, author, id);
    id = Rbtn.id;
    book.remove();
    items.remove();
  });
}

if (books !== null) {
  books.forEach((book) => {
    displayBooks(book.title, book.author, book.id);
  });
}

const date = document.getElementById('date');
const shownDate = [Date().split(' ').splice(1, 4).join(' ')];
date.append(shownDate);

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const id = Date();
    const book = new Book(title, author, id);
    book.newBook();
    if (title && author) {
      displayBooks(book.title, book.author, book.id);
    }
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  });
});

const list = document.getElementById('all-book');
const add = document.querySelector('.form-section');
const contacts = document.getElementById('contacts');
const listLink1 = document.getElementById('con-link1');
const listLink2 = document.getElementById('con-link2');
const listLink3 = document.getElementById('con-link3');

listLink1.addEventListener('click', () => {
  list.classList.remove('show');
  listLink1.classList.add('active');
  contacts.classList.add('show');
  listLink3.classList.remove('active');
  listLink2.classList.remove('active');
  add.classList.add('show');
});

listLink2.addEventListener('click', () => {
  listLink2.classList.add('active');
  add.classList.remove('show');
  list.classList.add('show');
  listLink1.classList.remove('active');
  contacts.classList.add('show');
  listLink3.classList.remove('active');
});

listLink3.addEventListener('click', () => {
  contacts.classList.remove('show');
  listLink3.classList.add('active');
  list.classList.add('show');
  listLink1.classList.remove('active');
  listLink2.classList.remove('active');
  add.classList.add('show');
});
