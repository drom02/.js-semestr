import { displayDetails } from "./appBookDetails.js"; 
document.addEventListener('DOMContentLoaded', function() {
     fetchData();
});
async function fetchData() {
    await fetch('/api/favoriteBooks')
    .then(response => response.json())
    .then(books => {
        if(books!==null)
        displayLoaded(books);
    })
}
async function displayLoaded(data){
    const container = document.getElementById("favoriteBooks");
    if(data.length===0){
        const element = document.createElement('div');
    }else{
        data.forEach(element => {
            displayBook(element,container);
    });
    }
}
async function  displayBook(item,container){
    const element = document.createElement('div');
    element.className = 'news-item';
    element.innerHTML = `<div data-id= "${item.id}" id="bookDetails">${item.title}  ${item.author}</div>`;
    container.appendChild(element);
    element.addEventListener('click', async function() {
        
         fetch(`/book/${item.id}`).then(response => response.json())
        .then(book => {
            displayDetails(book);
        })
    });
}