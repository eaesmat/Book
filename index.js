/* eslint linebreak-style: ["error", "unix"] */
const form = `<div>
  <div class="form-group">
    <label for="title">Title</label>
    <input type="text" class="form-control" id="title" aria-describedby="authorHelp" placeholder="Enter Your title" required>
  </div>
  <div class="form-group mt-3">
    <label for="author">Author</label>
    <input type="text" class="form-control" id="author" placeholder="Enter Your author" required>
  </div>
  <button type="button" class="btn btn-primary mt-3" onclick="ADD()">ADD</button>
</div>`;
let details = [];
function table() {
  let table = `<table class="table">
  <thead>
    <tr>
      <th>Number</th>
      <th>title</th>
      <th>Author</th>
    </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < details.length; i += 1) {
    table += `<tr>
      <td>${i + 1}</td>
      <td>${details[i].title}</td>
      <td>${details[i].author}</td>
      <td><button type="button" class="btn btn-danger" onclick="RemoveData(${i})">Remove</button></td>
    </tr> `;
  }
  table += `</tbody>
    </table>`;
  document.getElementById('table').innerHTML = table;
}
document.getElementById('form').innerHTML = form;

function setData() {
  localStorage.setItem('details', JSON.stringify(details));
}
getData();
table();
function getData() {
  const Data = localStorage.getItem('details');
  if (Data) {
    details = JSON.parse(Data);
  } else {
    setData();
  }
}

function ADD() {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const data = {
    title: title.value,
    author: author.value,
  };
  details.push(data);
  setData();

  // console.log(details)
  // console.log(author.value)
  table();
  title.value = '';
  author.value = '';
}
function RemoveData(index) {
  details.splice(index, 1);
  setData();
  table();

  // console.log('Remove work')
  // console.log(details)
}
