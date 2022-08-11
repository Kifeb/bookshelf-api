const { addBook, getAllbooks, getBooksByID, editBookByID, delBookByID} = require("./handler");

const routes = [
    {
        method: "POST",
        path: "/books",
        handler: addBook,
    },
    {
        method: "GET",
        path: "/books",
        handler: getAllbooks,
    },
    {
        method: "GET",
        path: "/books/{id}",
        handler: getBooksByID,
    },
    {
        method: "PUT",
        path: "/books/{id}",
        handler: editBookByID,
    },
    {
        method: "DELETE",
        path: "/books/{id}",
        handler: delBookByID,
    },
];

module.exports = routes;