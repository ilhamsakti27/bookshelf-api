const { nanoid } = require('nanoid');
const books = require('./books');

const addBook = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = req.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  };

  if (name == null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    
    return response;
  }
  
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    
    return response;
  }
  
  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data:  {
        bookId: id
      },
    });
    response.code(201);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);

  return response;
};

const getAllBooks = (req, h) => {
  const { name, reading, finished } = req.params;

  const allBooks = [];

  // books.forEach( (book) => {
  //   allBooks.push({
  //     id: book.id,
  //     name: book.name,
  //     publisher: book.publisher
  //   });
  // });

  // const response = h.response({
  //   status: 'success',
  //   data: {
  //     books: allBooks
  //   }
  // });
  // response.code(200);

  // return response;

  // optional 
  // if (name != null) {
  //   const queryName = name.toLowerCase();
  //   const name = 

  // }
  if (reading == 0) {
    books.forEach( (book) => {
      if (!book.reading) {
        allBooks.push({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        });  
      }
    });

    const response = h.response({
      status: 'success',
      data: {
        books: allBooks
      }
    });
    response.code(200);

    return response;
  }
  if (reading == 1) {
    books.forEach( (book) => {
      if (book.reading) {
        allBooks.push({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        });  
      }
    });

    const response = h.response({
      status: 'success',
      data: {
        books: allBooks
      }
    });
    response.code(200);

    return response;
  }
  if (finished == 0) {
    books.forEach( (book) => {
      if (!book.finished) {
        allBooks.push({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        });  
      }
    });

    const response = h.response({
      status: 'success',
      data: {
        books: allBooks
      }
    });
    response.code(200);

    return response;
  }
  if (finished == 1) {
    books.forEach( (book) => {
      if (book.finished) {
        allBooks.push({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        });  
      }
    });

    const response = h.response({
      status: 'success',
      data: {
        books: allBooks
      }
    });
    response.code(200);

    return response;
  }

  books.forEach( (book) => {
    allBooks.push({
      id: book.id,
      name: book.name,
      publisher: book.publisher
    });
  });

  const response = h.response({
    status: 'success',
    data: {
      books: allBooks
    }
  });
  response.code(200);

  return response;
};

const getDetailBooks = (req, h) => {
  const { bookId } = req.params;
  // console.log(bookId);
  const book = books.filter((book) => book.id === bookId)[0];
  // console.log(book);

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book: book,
      }
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);

  return response;
};

const updateBook = (req, h) => {
  const { bookId } = req.params;
  const { 
    name, 
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = req.payload;

  const updateBook = new Date().toISOString();
  const bookIndex = books.findIndex((book) => book.id === bookId);
  
  if (bookIndex !== -1) {
  
    if (name == null) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);

      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      });
      response.code(400);

      return response;
    }

    books[bookIndex] = {
      ...books[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading
    };
    
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);

    return response;
  }
  
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  });
  response.code(404);

  return response;
};

const deleteBook = (req, h) => {
  const { bookId } = req.params;
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  });
  response.code(404);

  return response;

};

module.exports = { addBook, getAllBooks, getDetailBooks,updateBook, deleteBook };