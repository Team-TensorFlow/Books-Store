const BookModel = require('../models/bookModel');

// @desc    Add new book (Create)
// @route   POST /api/books
exports.createBook = async (req, res) => {
  try {
    const { title, author, price, genre, published_year } = req.body;

    // Validation for required fields
    if (!title || !author || price === undefined || price === null) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: title, author, and price are required.'
      });
    }

    if (isNaN(Number(price)) || Number(price) < 0) {
      return res.status(400).json({
        success: false,
        error: 'Price must be a valid positive number.'
      });
    }

    const newBook = await BookModel.create({
      title: title.trim(),
      author: author.trim(),
      price: Number(price),
      genre: genre ? genre.trim() : null,
      published_year: published_year ? Number(published_year) : null
    });

    return res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: newBook
    });
  } catch (error) {
    console.error('Error creating book:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while creating book'
    });
  }
};

// @desc    Get all books (Read All)
// @route   GET /api/books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.findAll();
    return res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while fetching books'
    });
  }
};

// @desc    Get single book by ID (Read by ID)
// @route   GET /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        error: 'Invalid book ID format'
      });
    }

    const book = await BookModel.findById(Number(id));
    if (!book) {
      return res.status(404).json({
        success: false,
        error: `Book with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while fetching book'
    });
  }
};

// @desc    Update book by ID (Update)
// @route   PUT /api/books/:id
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, price, genre, published_year } = req.body;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        error: 'Invalid book ID format'
      });
    }

    // Check if book exists first
    const existingBook = await BookModel.findById(Number(id));
    if (!existingBook) {
      return res.status(404).json({
        success: false,
        error: `Book with ID ${id} not found`
      });
    }

    // Use existing values if not provided in update payload
    const updatedTitle = title !== undefined ? title.trim() : existingBook.title;
    const updatedAuthor = author !== undefined ? author.trim() : existingBook.author;
    const updatedPrice = price !== undefined ? Number(price) : existingBook.price;
    const updatedGenre = genre !== undefined ? (genre ? genre.trim() : null) : existingBook.genre;
    const updatedYear = published_year !== undefined ? (published_year ? Number(published_year) : null) : existingBook.published_year;

    if (!updatedTitle || !updatedAuthor || isNaN(updatedPrice) || updatedPrice < 0) {
      return res.status(400).json({
        success: false,
        error: 'Title, author, and a valid positive price are required'
      });
    }

    const updatedBook = await BookModel.update(Number(id), {
      title: updatedTitle,
      author: updatedAuthor,
      price: updatedPrice,
      genre: updatedGenre,
      published_year: updatedYear
    });

    return res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook
    });
  } catch (error) {
    console.error('Error updating book:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while updating book'
    });
  }
};

// @desc    Delete book by ID (Delete)
// @route   DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        error: 'Invalid book ID format'
      });
    }

    const isDeleted = await BookModel.delete(Number(id));
    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        error: `Book with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      message: `Book with ID ${id} successfully deleted`
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while deleting book'
    });
  }
};
