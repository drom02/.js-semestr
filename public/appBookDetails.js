
export async function displayDetails(book){
    const container = document.getElementById('detailView');
    fillDetails(book)
}

function fillDetails(data){
   loadContent("book-details",data)
    
}

async function  loadContent(type, content) {
    await fetch(`/${type}`)
        .then(response => response.text())  
        .then( async html => {
             document.getElementById('detailView').innerHTML = html;
        })
        .catch(error => console.error('Failed to load content:', error));
        document.getElementById('titleField').textContent= content.title;
        document.getElementById('authorField').textContent= content.author;
        document.getElementById('languageField').textContent= content.language;
        document.getElementById('abstractField').textContent= content.abstract;
        addSubElements();
}

async function addSubElements(){
        fetch('/validateRole').then(r=> r.json()).then(state => {
        if(state ===true){
          document.getElementById('buttonsField').innerHTML = ` <form action="/address" method="POST">
            <button type="submit">Submit</button>
        </form>`
        }
        
      })
}