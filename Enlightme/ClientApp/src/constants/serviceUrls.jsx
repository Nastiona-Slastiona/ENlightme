const serviceUrls = {
    getUser: 'http://localhost:8000/api/user/',
    getUserImage: 'http://localhost:8000/api/image/',
    getUserSettings: 'http://localhost:8000/api/settings/',
    updateUserSettings: 'http://localhost:8000/api/settings/',
    getUserBookId: 'http://localhost:8000/book/:id/',

    getBooks: 'http://localhost:8000/book/library/',
    getRecommendedBooks: 'http://localhost:8000/api/recommended_library/',
    getUserBooks: 'http://localhost:8000/book/books/',
    getBookById: 'http://localhost:8000/book/:id/',
    createBook: 'http://localhost:8000/book/create/',
    deleteBook: 'http://localhost:8000/book/delete/:bookId/',

    getCards: 'http://localhost:8000/card/cards/',
    getCardsLearn: 'http://localhost:8000/card/cards/learn/',
    getBookCards: 'http://localhost:8000/api/books/:id/cards/',
    createCard: 'http://localhost:8000/card/create/',
    deleteCard: 'http://localhost:8000/card/delete/:cardId/',
    finishedCard: 'http://localhost:8000/api/cards/:id/',
    updateCard: 'http://localhost:8000/card/:id/update/',

    getNotifications: 'http://localhost:8000/card/notifications/',
    getCommonInfo: 'http://localhost:8000/book/common-info/',

    registration: 'http://localhost:8000/auth/register/',
    login: 'http://localhost:8000/auth/login/',
    refreshToken: 'http://localhost:8000/auth/refresh/',
    signOut: 'http://localhost:8000/auth/logout/',

    payment: 'http://localhost:8000/api/payment/create-payment-intent/',
    paymentConfig: 'http://localhost:8000/api/payment/config/',
    paymentWebhook: 'http://localhost:8000/api/payment/webhook/',
    paymentCheckout: 'http://localhost:8000/api/payment/checkout-session/:id/',
};

export default serviceUrls;