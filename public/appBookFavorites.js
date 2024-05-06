import { displayDetails } from "./appBookDetails.js"; 
document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});
function fetchData() {
    fetch('/api/books')
    .then(response => response.json())
    .then(books => {
        displayLoaded(books);
    })
}
async function displayLoaded(data){
    const container = document.getElementById('content');
    data.forEach(element => {
        displayBook(element,container);
});
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