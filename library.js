let books = [];
addBook = (book) =>{
    let table  = $("#IDbooktable tbody");
    table.append(`
    <tr id="${book.id}">
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.year}</td>
        <td>${book.quantity}</td>
        <td>
        <button class="mb-1 btn btn-sm btn-success editBtn" data-id="${book.id}">
        <i class="fa fa-pencil" style="font-size: 1em; aria-hidden="true"></i>
        </button>
        <button class="mb-1 btn btn-sm btn-danger deleteBtn" data-id="${book.id}">
        <i class="fa fa-trash" style="font-size: 1em;" aria-hidden="true"></i>
        </button>
        </td>

    
    `);
}
clearForm = () =>{   
    $("#IDbooktitle").val("");
    $("#IDauthor").val("");
    $("#IDgenre").val("");
    $("#IDyear").val("");
    $("#IDquantity").val("");
}
generateId = () =>{
     return Math.floor(Math.random() * 1000000)
}
$(document).on("click", "#clearBtn", function(){
    clearForm();
});
$("#IDbookform").submit(function(e){
    e.preventDefault();
    let book = {
        id: generateId(),
        title: $("#IDbooktitle").val(),
        author: $("#IDauthor").val(), 
        genre: $("#IDgenre").val(),
        year: $("#IDyear").val(),
        quantity: $("#IDquantity").val()  
    };
    books.push(book);
    addBook(book);
    clearForm();
});
$("#IDeditform").submit(function(e){
    e.preventDefault();
    let bookId = $("#editBookId").val();
    let bookIndex = books.findIndex((book) => book.id == bookId);
    let book = books[bookIndex];
    book.title = $("#editbooktitle").val();
    book.author = $("#editauthor").val(); 
    book.genre = $("#editgenre").val();
    book.year = $("#edityear").val();
    book.quantity = $("#editquantity").val();

    let row = $(`#${book.id}`);	
    row.find("td:eq(0)").text(book.title);
    row.find("td:eq(1)").text(book.author);
    row.find("td:eq(2)").text(book.genre);
    row.find("td:eq(3)").text(book.year);
    row.find("td:eq(4)").text(book.quantity);
    
    $("#editModal").modal("hide");
});

$(document).on("click", ".editBtn", function(){
 let bookId = $(this).data("id");
 let bookIndex = books.findIndex((book) => book.id == bookId);
 let book = books[bookIndex];
 $("#editbooktitle").val(book.title);
 $("#editauthor").val(book.author);
 $("#editgenre").val(book.genre);
 $("#edityear").val(book.year);
 $("#editquantity").val(book.quantity);
 $("#editBookId").val(book.id); 

 $("#editModal").modal("show");
});

$(document).on("click","#clsBtn",function(){
    $("#editModal").modal("hide");

});

$(document).on("click",".deleteBtn",function(){ 
    let bookId = $(this).data("id");
    let bookIndex = books.findIndex((book) => book.id == bookId);
    let book = books[bookIndex];
    if(confirm(`Are you sure you want to delete ${book.title}`)){
        books.splice(bookIndex, 1);
        $(`#${book.id}`).remove();
    }

});

