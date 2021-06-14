const UNCOMPLETE_BOOK_SHELF_LIST_ID = "incompleteBookshelfList";
const COMPLETE_BOOK_SHELF_LIST_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";



const checkBox = document.getElementById("inputBookIsComplete");
let isCompleted = false;

checkBox.addEventListener("change", function(){
    if(checkBox.checked){
        isCompleted = true;
        document.querySelector("span").innerText = "Selesai dibaca";
    }else {
        isCompleted = false;
        document.querySelector("span").innerText = "Belum selesai dibaca";
    }
});

function inCompleteBook (title, bookAuthor, bookYear, isCompleted) {
    //membuat elemen judul
    const textTitle = document.createElement("h3");
    textTitle.innerHTML = `<span id="title">` + title + `</span>`;

    //membuat elemen penulis
    const textAuthor = document.createElement("p");
    textAuthor.innerHTML = `Penulis: <span id="author">` + bookAuthor + `</span>`;

    //membuat elemen tahun
    const textYear = document.createElement("p");
    textYear.innerHTML = `Tahun: <span id="year">` + bookYear + `</span>`;
    

    //membuat elemen div
    const div = document.createElement("div");
    div.classList.add("action");

    //membuat elemen article dengan class book_item
    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item");

    textContainer.append(textTitle, textAuthor, textYear);
    
    if(isCompleted){
        div.append(
            createButtonUndo(),
            createRedButton()
        );
    } else {
        div.append(
            createCheckButton(),
            createRedButton()
        );
    }

    textContainer.append(div);

    return textContainer; 
};

function createButtonUndo(){
    return createUndoButton("yellow", function(event){
        undoBookFromComplete(event.target.parentElement.parentElement);
    });
};

function createCheckButton(){
    return createButton("green", function(event){
        addBookToCompleted(event.target.parentElement.parentElement);
        
    });
};

function createRedButton(){
    return createButtonRed("red", function(event){
        removeBookFromIncompleted(event.target.parentElement.parentElement);
    });
}


function createButton(green, eventListener){
    // Membuat button selesai di baca
    const buttonGreen = document.createElement("button");
    buttonGreen.classList.add(green);
    buttonGreen.innerText = "Selesai Dibaca";
    
    buttonGreen.addEventListener("click", function (event) {
        eventListener(event);
    });

    return buttonGreen;
};


function createButtonRed(red, eventListener){
    // Membuat button hapus
    const buttonRed = document.createElement("button");
    buttonRed.classList.add(red);
    buttonRed.innerText = "Hapus";
    
    buttonRed.addEventListener("click", function (event) {
        eventListener(event);
    });

    return buttonRed;
};

function createUndoButton(yellow, eventListener){
    // Membuat button selesai di baca
    const buttonYellow = document.createElement("button");
    buttonYellow.classList.add(yellow);
    buttonYellow.innerText = "Belum Selesai";
    
    buttonYellow.addEventListener("click", function (event) {
        eventListener(event);
    });

    return buttonYellow;
};



function addbook() {
    
    const inputBookTitle = document.getElementById("inputBookTitle").value;
    const inputBookAuthor = document.getElementById("inputBookAuthor").value;
    const inputBookYear = document.getElementById("inputBookYear").value;

    // console.log(inputBookTitle);
    // console.log(inputBookAuthor);
    // console.log(inputBookYear);
    // console.log(isCompleted);

    if (checkBox.checked){
        const completeBookList = document.getElementById(COMPLETE_BOOK_SHELF_LIST_ID);
        const readNow = inCompleteBook(inputBookTitle, inputBookAuthor, inputBookYear, true);
        completeBookList.append(readNow);
        return completeBookList;
    }else{
        const uncompleteBookList = document.getElementById(UNCOMPLETE_BOOK_SHELF_LIST_ID);
        const readNow = inCompleteBook(inputBookTitle, inputBookAuthor, inputBookYear, false);

        const bookObject = composeBookObject(inputBookTitle, inputBookAuthor, inputBookYear, false);
        inCompleteBook[BOOK_ITEMID]=bookObject.id;
        bookshelf.push(bookObject);
        
        uncompleteBookList.append(readNow);
        updateDataToStorage();
        // return uncompleteBookList;
    };
    
};

function addBookToCompleted(bookElement){
    const listCompleted = document.getElementById(COMPLETE_BOOK_SHELF_LIST_ID);
    const bookTitle = bookElement.querySelector("span#title").innerHTML;
    const bookAuthor = bookElement.querySelector("span#author").innerHTML;
    const bookYear = bookElement.querySelector("span#year").innerHTML;
    
 
    const newBookDone = inCompleteBook(bookTitle, bookAuthor, bookYear, true);

    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBookDone[BOOK_ITEMID] = book.id;

    listCompleted.append(newBookDone);
    bookElement.remove();

    updateDataToStorage();

    
    // return listCompleted;
};

function removeBookFromIncompleted(bookElement /* HTMLELement */) {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    bookshelf.splice(bookPosition, 1);

    bookElement.remove();

    // updateDataToStorage();
};

function undoBookFromComplete(bookElement){
    const listBookUncomplete = document.getElementById(UNCOMPLETE_BOOK_SHELF_LIST_ID);
    const bookTitle = bookElement.querySelector("span#title").inneText;
    const bookAuthor = bookElement.querySelector("span#author").innerText;
    const bookYear = bookElement.querySelector("span#year").innerText;
 
    const newBookDone = inCompleteBook(bookTitle, bookAuthor, bookYear, false);

    const book=findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted= false;
    newBookDone[BOOK_ITEMID] = book.id;
    listBookUncomplete.append(newBookDone);
    
    bookElement.remove();

    updateDataToStorage();
};

// function refreshDataFromBookShelf() {
//     const BookUncompleted = document.getElementById(UNCOMPLETE_BOOK_SHELF_LIST_ID);
//     let BookCompleted = document.getElementById(COMPLETE_BOOK_SHELF_LIST_ID);
  
  
//     for(incompleteBookshelfList of bookshelf){
//         const newBook = inCompleteBook(incompleteBookshelfList.booktitle, incompleteBookshelfList.bookauthor, incompleteBookshelfList.bookyear, incompleteBookshelfList.isCompleted);
//         newBook[BOOK_ITEMID] = incompleteBookshelfList.id;
  
  
//         if(incompleteBookshelfList.isCompleted){
//             BookCompleted.append(newBook);
//         } else {
//             BookUncompleted.append(newBook);
//         }
//     }
//  }