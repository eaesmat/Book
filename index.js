/* eslint linebreak-style: ["error", "unix"] */
const form = `<div>
  <div class="form-group">
    <label for="title">Title</label>
    <input type="text" class="form-control" id="title" aria-describedby="authorHelp" placeholder="Enter Your title">
  </div>
  <div class="form-group mt-3">
    <label for="author">Author</label>
    <input type="author" class="form-control" id="author" placeholder="Enter Your author">
  </div>
  <button type="submit" class="btn btn-primary mt-3" onclick="ADD()">ADD</button>
</div>`;

function table() {
  let table = `<table class="table">
  <thead>
    <tr>
      <th clsaa="col-1">NO</th>
      <th clsaa="col-3">title</th>
      <th clsaa="col-4">Author</th>
      <th clsaa="col-2">Remove</th>
    </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < details.length; i++) {
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
details = [];
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
function setData() {
  localStorage.setItem('details', JSON.stringify(details));
}
function ADD() {
  const title = document.getElementById('title');
  const author = document.getElementById('author');

  if (title.value === 0) {
    alert('title is Empty');
    return;
  }
  if (author.value === 0) {
    alert('Author is Empty');
    return;
  }
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

function update(index) {
  const newtitle = document.getElementById('newtitle');
  const newauthor = document.getElementById('newauthor');

  details[index] = {
    title: newtitle.value,
    author: newauthor.value,
  };
  setData();
  table();
  document.getElementById('form').innerHTML = form;
  // console.log('update work')
  // console.log(details)
}
