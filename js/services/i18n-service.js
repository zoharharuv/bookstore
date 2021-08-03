var gTrans = {
    // index.html
    'header-title': {
        en: 'Welcome to the Bookstore',
        he: 'ברוכים הבאים לחנות הספרים',
    },
    eng: {
        en: 'English',
        he: 'אנגלית'
    },
    heb: {
        en: 'Hebrew',
        he: 'עברית'
    },
    'filter-all': {
        en: 'All',
        he: 'הכל',
    },
    'filter-title': {
        en: 'By title',
        he: 'כותרת'
    },
    'filter-price': {
        en: 'By price',
        he: 'מחיר',
    },
    // add book
    'add-title-placeholder': {
        en: 'Title',
        he: 'כותרת'
    },
    'add-price-placeholder': {
        en: 'Price',
        he: 'מחיר'
    },
    'add-book': {
        en: 'Add book',
        he: 'הוסף ספר'
    },
    // modal
    'book-details': {
        en: 'Book Details',
        he: 'פרטי הספר'
    },
    // controller.js
    'no-books': {
        en: 'No books at the moment!',
        he: '!אין ספרים כרגע'
    },
    id: {
        en: 'Id',
        he: 'מזהה'
    },
    title: {
        en: 'Title',
        he: 'כותרת'
    },
    price: {
        en: 'Price',
        he: 'מחיר'
    },
    actions: {
        en: 'Actions',
        he: 'פעולות'
    },
    // actions
    read: {
        en: 'Read',
        he: 'קרא'
    },
    update: {
        en: 'Update',
        he: 'עדכן'
    },
    delete: {
        en: 'Delete',
        he: 'מחק'
    },
    close: {
        en: 'Close',
        he: 'סגור'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'
    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans['en']
    return txt;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var txt = getTrans(el.dataset.trans)
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt)
        } else {
                el.innerText = txt;
        }
    })
}

function setLang(lang) {
    gCurrLang = lang;
    document.querySelector('body').style.direction =(gCurrLang === 'he') ?'rtl' : 'ltr';
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    if (gCurrLang === 'en'){
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    }
    if (gCurrLang === 'he'){
        return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
    }
}