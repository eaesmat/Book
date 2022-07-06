const form = document.getElementById('form');
let books = JSON.parse(localStorage.getItem('books'));

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

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const id = Date.now();
    const book = new Book(title, author, id);
    book.newBook();
    if (title && author) {
      displayBooks(book.title, book.author, book.id);
    }
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  });
});
