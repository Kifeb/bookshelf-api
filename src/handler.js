const { nanoid } = require("nanoid");
const books = require("./books");


//? Menambah DATA BOOK
const addBook = (request, h) => {
    // Dari Klien
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    //?Cek Data
        if(name === undefined){
            const response = h.response({
                status: "fail",
                message: "Gagal menambahkan buku. Mohon isi nama buku",
            });
            response.code(400);
            return response;
        }
        
        if(readPage > pageCount){
            const response = h.response({
                status: "fail",
                message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
            });
            response.code(400);
            return response;
        };

    // dari Server
    const id = nanoid(16);
    const insertedAt = new Date().toDateString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage ? true : false;

    // Input data buku
    const addOneBook = {id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt};

    books.push(addOneBook);
    
    const checking = books.filter((book) => book.id === id).length > 0;

    if(checking) {
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            }
        });
        response.code(201);
        return response
    }
    const response = h.request({
        "status": "eror",
        "message": "Buku gagal ditambahkan"
    });
    response.code(500);
    return response

};

//? Melihat semua data Buku
const getAllbooks = () => ({
        status: "success",
            data: {
                books: books.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                }))
        },
    }
);


//? Melihat buku berdasarkan ID
const getBooksByID = (request, h) => {
    const { id } = request.params;

    const book = books.filter((book) => book.id === id)[0];

    if(book !== undefined){
        return{
            status: "success",
            data: {
                book,
            },
        }
    }
    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan"
    });
    response.code(404);
    return response
};

//? Mengubah Data
const editBookByID = (request, h) => {
    const {id} = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();
    const finished = pageCount === readPage ? true : false;

    if(name === undefined){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;

    }
    
    if(readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    };

    const index = books.findIndex((book) => book.id === id);

    if(index !== -1){
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt
        };
        const response = h.response({
            status: "success",
            message: "Buku berhasil diperbarui"
        });
        response.code(200)
        return response
    }

    const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan"
    });
    response.code(404)
    return response
}

//? Menghapus data Buku Berdasarkan ID
const delBookByID = (request, h) => {
    const {id} = request.params;
    const index = books.findIndex((book)=> book.id === id);

    if(index !== -1){
        books.splice(index, 1);
        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus"
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan"
    })
    response.code(404);
    return response;
};



module.exports = {addBook, getAllbooks, getBooksByID, editBookByID, delBookByID};