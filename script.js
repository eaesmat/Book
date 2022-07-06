// add class
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  books(value) {
    this.value = value;
  }

  newBook() {
    let show;
    const { title, author, id } = this;
    const bookList = { title, author, id };
    show = JSON.parse(localStorage.getItem('show'));
    if (title === '' || author === '') {
      document.getElementById('error').innerHTML = 'Required';
    } else if (show !== null) {
      show.push(bookList);
      localStorage.setItem('show', JSON.stringify(show));
      show = JSON.parse(localStorage.getItem('show'));
    } else {
      show = [];
      show.push(bookList);
      localStorage.setItem('show', JSON.stringify(show));
      show = JSON.parse(localStorage.getItem('show'));
    }
  }

  // remove
  remove() {
    let show = '';
    const { id } = this;
    show = show.filter((book) => {
      if (book.id === id) {
        return false;
      }
      return true;
    });

    localStorage.setItem('show', JSON.stringify(show));
  }
}

// show
function displayshow(title, author, id) {
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
let show;
if (show !== null) {
  show.forEach((book) => {
    displayshow(book.title, book.author, book.id);
  });
}
let form;
document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const id = Date.now();
    const book = new Book(title, author, id);
    book.newBook();
    if (title && author) {
      displayshow(book.title, book.author, book.id);
    }
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  });
});
