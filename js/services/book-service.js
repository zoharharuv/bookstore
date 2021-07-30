'use strict'
var gBookId;
var gBooks = [];
var gFilterBy = 'all';
var gCurrBook;
// page
const PAGE_SIZE = 5;
var gPageIdx = 0;
// to localstorage
_getCurrId();
_createBooks();

function getPages() {
    var pages = gBooks.length / PAGE_SIZE;
    return pages;
}

function resetPageIdx() {
    if (gBooks.length % PAGE_SIZE === 0) gPageIdx = 0;
}

function nextPage(pageNum) {
    gPageIdx = pageNum;
}


function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function setFilterBy(filterBy) {
    gFilterBy = filterBy;
}

function getBooksToShow() {
    if (!gBooks.length) return gBooks = [];
    var books = getBooks();
    if (gFilterBy === 'all') return books;
    if (gFilterBy === 'name' || gFilterBy === 'price') {
        if (books.length === 1) return books;
    }
    if (gFilterBy === 'name') {
        books.sort(function (book1, book2) {
            return book1.name.localeCompare(book2.name);
        })
    }
    else if (gFilterBy === 'price') {
        books.sort(function (book1, book2) {
            return book2.price - book1.price;
        })
    }
    return books;
}

function getCurrentBook() {
    return gCurrBook;
}

function updateBookRate(book, val) {
    book.rate += val;
    _saveBooksToStorage();
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    gCurrBook = book;
    return book;
}
function updateBook(bookId, price) {
    if (!price) return;
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    book.price = price;
    _saveBooksToStorage();
}

function removeBook(bookId) {
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks.splice(idx, 1);
    _saveBooksToStorage();
}

function addBook(name, price) {
    if (!name || !price) return;
    var book = {
        id: 'b' + gBookId,
        name,
        price,
        imgUrl: _getRndImg(gBookId),
        rate: 0
    }
    gBooks.push(book);
    gBookId++;
    _saveIdToStorage();
    _saveBooksToStorage();
}




// PRIVATE FUNCTIONS
function _createBooks() {
    var books = loadFromStorage('booksDB');
    if (books && books.length) {
    } else {
        gBookId = 101;
        _saveIdToStorage();
        addBook('Narnia', 15);
        addBook('Little Price', 18);
        addBook('Physics', 20);
        return;
    }
    gBooks = books;
}
// SAVES
function _saveBooksToStorage() {
    saveToStorage('booksDB', gBooks);
}

function _saveIdToStorage() {
    saveToStorage('lastBookId', gBookId);
}
// GETS
function _getCurrId() {
    gBookId = loadFromStorage('lastBookId')
    if (!gBookId) {
        gBookId = 101;
        _saveIdToStorage();
    }
}

function _getRndImg(id) {
    return `https://picsum.photos/seed/${id}/150/250`;
}