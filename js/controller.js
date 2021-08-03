'use strict'
function onInit() {
    renderBooks();
    renderPaging();
}

function renderBooks() {
    var books = getBooksToShow();
    var strHTML = '';
    if (!books.length) strHTML = '<h1 data-trans="no-books">No books at the moment!</h1>';
    else {
        strHTML = '<table class="books-table"><tbody>';
        strHTML += `<tr>
        <td onclick="onSetFilter('all')" data-trans="id">Id</td>
        <td onclick="onSetFilter('name')" data-trans="title">Title</td>
        <td onclick="onSetFilter('price')" data-trans="price">Price</td>
        <td class="actions" colspan="3" data-trans="actions">Actions</td>
        </tr>`;
        books.forEach(function (currBook) {
            strHTML += `<tr>
            <td>${currBook.id}</td>
            <td>${currBook.name}</td>
            <td>${formatCurrency(formatNum(currBook.price))}</td>
            <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookModal" onclick="onReadBook('${currBook.id}')" data-trans="read">Read</button></td>
            <td><button class="action update" onclick="onUpdateBook('${currBook.id}')" data-trans="update">Update</button></td>
            <td><button class="action delete" onclick="onRemoveBook('${currBook.id}')" data-trans="delete">Delete</button></td>
            </tr>`;
        })
        strHTML += '</tbody></table>';
    }
    var el = document.querySelector('.books-section');
    el.innerHTML = strHTML;
    doTrans();
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

function onSetLang(langBy) {
    setLang(langBy);
    renderBooks();
}

function onSetFilter(filterBy) {
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
    var price = +prompt('enter new book\'s price');
    updateBook(bookId, price);
    renderBooks();
}
function onRemoveBook(bookId) {
    removeBook(bookId);
    resetPageIdx();
    renderBooks();
    renderPaging();
}

// MODAL
function onReadBook(bookId) {
    var book = getBookById(bookId);
    document.querySelector('.modal-title').innerText = `${book.name}`;
    document.querySelector('[name="book-rate"]').value = `${book.rate}`;
    document.querySelector('.modal-img').src = `${book.imgUrl}`;
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

