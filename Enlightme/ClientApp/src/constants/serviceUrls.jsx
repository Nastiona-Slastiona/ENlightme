const serviceUrls = {
    getUser: 'http://localhost:8000/api/user/',
    getUserImage: 'http://localhost:8000/api/image/',
    getUserSettings: 'http://localhost:8000/api/settings/',
    updateUserSettings: 'http://localhost:8000/api/settings/',
    getUserBookId: 'http://localhost:8000/book/:id/',
    // getBookInfo: 'http://localhost:8000/api/books/:id/book_info/',

    getBooks: 'http://localhost:8000/book/library/',
    getRecommendedBooks: 'http://localhost:8000/api/recommended_library/',
    getUserBooks: 'http://localhost:8000/book/books/',
    getBookById: 'http://localhost:8000/book/:id/',
    createBook: 'http://localhost:8000/book/create/',
    deleteBook: 'http://localhost:8000/api/books/:id/',

    getCards: 'http://localhost:8000/card/cards/',
    getBookCards: 'http://localhost:8000/api/books/:id/cards/',
    createCard: 'http://localhost:8000/card/create/',
    deleteCard: 'http://localhost:8000/api/books/:bookId/cards/:id/',
    finishedCard: 'http://localhost:8000/api/cards/:id/',
    updateCard: 'http://localhost:8000/card/:id/update/',

    getNotes: 'http://localhost:8000/api/notes/',
    getBookNotes: 'http://localhost:8000/api/books/:id/notes/',
    createNote: 'http://localhost:8000/api/books/:id/notes/',
    deleteNote: 'http://localhost:8000/api/notes/:id/',

    getNotifications: 'http://localhost:8000/card/notifications/',
    getGenres: 'http://localhost:8000/book/genres/',

    registration: 'http://localhost:8000/auth/register/',
    login: 'http://localhost:8000/auth/login/',
    refreshToken: 'http://localhost:8000/auth/login/refresh/',
    signOut: 'http://localhost:8000/auth/logout/',

    payment: 'http://localhost:8000/api/payment/create-payment-intent/',
    paymentConfig: 'http://localhost:8000/api/payment/config/',
    paymentWebhook: 'http://localhost:8000/api/payment/webhook/',
    paymentCheckout: 'http://localhost:8000/api/payment/checkout-session/:id/',
};

export default serviceUrls;