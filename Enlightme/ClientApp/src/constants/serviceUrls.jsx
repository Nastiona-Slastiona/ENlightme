const serviceUrls = {
    getUser: 'http://localhost:8000/api/user/',
    getUserPhoto: 'http://localhost:8000/api/user/photo/',
    getUserSettings: 'http://localhost:8000/api/settings/',
    updateUserSettings: 'http://localhost:8000/api/settings/',
    getUserBookId: 'http://localhost:8000/api/books/:id/user_book_id/',
    getBookInfo: 'http://localhost:8000/api/books/:id/book_info/',

    getBooks: 'http://localhost:8000/api/library/',
    getRecommendedBooks: 'http://localhost:8000/api/recommended_library/',
    getUserBooks: 'http://localhost:8000/api/books/',
    getBookById: 'http://localhost:8000/api/books/:id/',
    createBook: 'http://localhost:8000/api/create_book/',
    deleteBook: 'http://localhost:8000/api/books/:id/',

    getCards: 'http://localhost:8000/api/cards/',
    getBookCards: 'http://localhost:8000/api/books/:id/cards/',
    createCard: 'http://localhost:8000/api/books/:id/cards/',
    deleteCard: 'http://localhost:8000/api/books/:bookId/cards/:id/',
    finishedCard: 'http://localhost:8000/api/cards/:id/',
    repeatedCard: 'http://localhost:8000/api/cards/:id/',

    getNotes: 'http://localhost:8000/api/notes/',
    getBookNotes: 'http://localhost:8000/api/books/:id/notes/',
    createNote: 'http://localhost:8000/api/books/:id/notes/',
    deleteNote: 'http://localhost:8000/api/notes/:id/',

    getNotifications: 'http://localhost:8000/api/notifications/',
    getGenres: 'http://localhost:8000/api/genres/',

    signUp: 'http://localhost:8000/auth/register/',
    signIn: 'http://localhost:8000/auth/login/',
    refreshToken: 'http://localhost:8000/auth/login/refresh/',
    signOut: 'http://localhost:8000/auth/logout/',

    payment: 'http://localhost:8000/api/payment/create-payment-intent/',
    paymentConfig: 'http://localhost:8000/api/payment/config/',
    paymentWebhook: 'http://localhost:8000/api/payment/webhook/',
    paymentCheckout: 'http://localhost:8000/api/payment/checkout-session/:id/',
};

export default serviceUrls;