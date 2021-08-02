'use strict'
function onInit() {
    renderBooks();
    renderPaging();
}

function renderBooks() {
    var books = getBooksToShow();
    var strHTML = '';
    if (!books.length) strHTML = '<h1>No books at the moment!</h1>';
    else {
        strHTML = '<table class="books-table"><tbody>';
        strHTML += `<tr>
        <td onclick="onSetFilter('all')">Id</td>
        <td onclick="onSetFilter('name')">Title</td>
        <td onclick="onSetFilter('price')">Price</td>
        <td class="actions" colspan="3">Actions</td>
        </tr>`;
        books.forEach(function (currBook) {
            strHTML += `<tr>
            <td>${currBook.id}</td>
            <td>${currBook.name}</td>
            <td>$${currBook.price}</td>
            <td><button class="action read" onclick="onReadBook('${currBook.id}')">Read</button></td>
            <td><button class="action update" onclick="onUpdateBook('${currBook.id}')">Update</button></td>
            <td><button class="action delete" onclick="onRemoveBook('${currBook.id}')">Delete</button></td>
            </tr>`;
        })
        strHTML += '</tbody></table>';
    }
    var el = document.querySelector('.books-section');
    el.innerHTML = strHTML;
}

function renderPaging() {
    var pages = getPages();
    if (pages <= 1) {
        document.querySelector('.paging-section').innerHTML = '';
        renderBooks();
        return;
    }
    var strHTML = '';
    for (let i = 0; i < pages; i++) {
        strHTML += `<button onclick="onNextPage(this.value)" value="${i}">${i + 1}</button>`;
    }
    var el = document.querySelector('.paging-section');
    el.innerHTML = strHTML;
}

function onNextPage(valueStr) {
    var pageNum = parseInt(valueStr);
    nextPage(pageNum);
    renderBooks();
}

function onSetFilter(filterBy) {
    console.log('Filtering by:', filterBy);
    setFilterBy(filterBy);
    renderBooks();
}

function onAddBook() {
    var elName = document.querySelector('[name=new-book-name]');
    var elPrice = document.querySelector('[name=new-book-price]');
    var name = elName.value;
    var price = elPrice.value;
    if (!name || !price || price === '0') return;
    elName.value = '';
    elPrice.value = '';
    addBook(name, price);
    renderBooks();
    renderPaging();
}

function onUpdateBook(bookId) {
    console.log('update book:', bookId);
    var price = +prompt('enter new book\'s price');
    updateBook(bookId, price);
    renderBooks();
}
function onRemoveBook(bookId) {
    console.log('remove book:', bookId);
    removeBook(bookId);
    resetPageIdx();
    renderBooks();
    renderPaging();
}

// MODAL
function onReadBook(bookId) {
    var book = getBookById(bookId);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h5').innerText = book.name;
    elModal.querySelector('[name=book-rate]').value = book.rate;
    elModal.querySelector('img').src = book.imgUrl;
    elModal.hidden = false;
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
}

function onRate(newValue) {
    var book = getCurrentBook();
    var elModal = document.querySelector('.modal');
    var valueStr = elModal.querySelector('[name=book-rate]').value;
    var valueInt = parseInt(valueStr);
    if (newValue === '-' && book.rate === 0) return;
    if (newValue === '+' && book.rate === 10) return;
    valueInt = parseInt(newValue + 1);
    updateBookRate(book, valueInt)
    elModal.querySelector('[name=book-rate]').value = book.rate;
}

