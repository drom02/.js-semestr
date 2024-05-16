

export async function displayDetails(book){
    fillDetails(book);
}

function fillDetails(data){
   loadContent("book-details",data)
}

async function  loadContent(type, content) {
  console.log("adding listner")
    await fetch(`/${type}`)
        .then(response => response.text())  
        .then( async html => {
             document.getElementById('detailView').innerHTML = html;
        })
        .catch(error => console.error('Failed to load content:', error));
        
        await addSubElements();
        await loadValues(content); 
}
async function loadValues(content){
  document.getElementById('detailView').setAttribute("book-id", content.id)
  document.getElementById('titleField').value= content.title;
  document.getElementById('authorField').value= content.author;
  document.getElementById('languageField').value= content.language;
  document.getElementById('abstractField').value= content.abstract;
}

async function addSubElements(){
        await fetch('/validateRole').then(r=> r.text()).then(type => {
          adminSubElements(type);
          normalSubElements(type);
          nonelSubElements(type);
          loadTags();
      })
}
async function adminSubElements(type){
  if(type ==="admin"){
     document.getElementById('detailGrid').innerHTML =`<form action="/update-book" method="POST" id="detailForm">
      <div class="grid-detail-field"><input type="text" id="titleField" name="title"></div>
      <div class="grid-detail-field"><input type="text" id="authorField"name="author"></div>
      <div class="grid-detail-field"><input type="text" id="languageField"name="language"></div>
      <div class="grid-detail-field"><input type="text" id="abstractField" name="abstract"></div>
      <div class="grid-detail-field" id="tagField" name="tags" > <select id="tagSelect" style="width: 100%;">
      </select></div>
      <div id="buttonsField" class="grid-detail-field"> <button type="submit">Update book</button><button type="submit" id="removeButton">Delete book</button></div>
    </form>
    `
  document.getElementById('detailForm').addEventListener('submit', function(event) {
    addBookID.bind(this)();
});
  document.getElementById('removeButton').addEventListener('click', async function(event) {
  event.preventDefault();  
  var bookId = document.getElementById('detailView').getAttribute('book-id');
  await fetch(`/delete-Book`,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: bookId })
})
        .then(response => console.log(response.text()) )  
        .catch(error => console.error('Failed to delete a book:', error));
});
  }
}
function addBookID(){
  var extraInfo = document.getElementById('detailView').getAttribute('book-id');
  var hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.name = 'id'; 
  hiddenInput.value = extraInfo;
  this.appendChild(hiddenInput);
}
async function normalSubElements(type){
  if(type ==="user"){
    document.getElementById('detailView').innerHTML =`<div class="grid-detailDivide">
    <div id="titleField" class="grid-detail-field"> Title</div>
    <div  id="authorField"class="grid-detail-field"> author</div>
    <div id="languageField" class="grid-detail-field"> language</div>
    <div id="abstractField" class="grid-detail-field"> abstract</div>
    <div id="tagField" class="grid-detail-field"> <select id="tagSelect" style="width: 100%;">
    </select></div>
    <div id="buttonsField" class="grid-detail-field"></div>
</div>
<div id="content"></div>`;
    document.getElementById('buttonsField').innerHTML = ` <form action="/api/addFavoriteBooks" method="POST">
  <button type="submit">Add to favorites</button>
</form>`}
          
}
async function nonelSubElements(){
  
}
async function loadTags(){
  loadScripts([
    "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
    "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"
], function() {
    console.log('All scripts loaded');
    $(document).ready(function() {
      $('#tagSelect').select2({
          placeholder: "Select an option",
          allowClear: true
      });
});
 
  
});
  var selector = document.getElementById('tagSelect')
  await fetch(`/load-allTags`,{
    method: 'POST',     
    headers: {
      'Content-Type': 'application/json' 
    }
  }).then(d => d.json()).then(data=> data.forEach(element => {
    addTagToList(element,selector);
  })
);
  
}
async function  addTagToList(item,container){
  const element = document.createElement('option');
  //element.className = 'news-item';
  element.innerHTML = item.name;
  container.appendChild(element);
  element.addEventListener('click', async function() {
       
  });
}
function loadScripts(scripts, finalCallback) {
  let index = 0;

  function loadScript() {
      if (index < scripts.length) {
          const script = document.createElement('script');
          script.src = scripts[index];

          script.onload = function() {
              console.log(`${script.src} loaded successfully.`);
              index++;
              loadScript(); // Load the next script
          };

          script.onerror = function() {
              console.error(`The script failed to load: ${script.src}`);
          };

          document.head.appendChild(script);
      } else {
          if (finalCallback) {
              finalCallback();
          }
      }
  }

  loadScript();
}