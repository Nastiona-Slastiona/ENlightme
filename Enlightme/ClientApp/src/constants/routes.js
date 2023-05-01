const HOME = '/';
const LIBRARY = '/library';
const ACCOUNT = '/user';
const ABOUT = '/about'
const BOOK = '/book/:id';
const SIGN_UP = '/sign-up';
const LOG_IN = '/login';
const CHECKOUT = '/checkout/:book_id';

const USER_BOOKS = '/user/books';
const USER_CARDS = '/user/cards';
const USER_NOTES = '/user/notes';
const USER_NOTIFICATIONS = '/user/notifications';

const USER_BOOK_CARDS = '/book/:id/cards';
const USER_BOOK_NOTES = '/book/:id/notes';

const READ_BOOK = '/book/:id/read';

export default {
    HOME,
    LIBRARY,
    ACCOUNT,
    ABOUT,
    BOOK,
    SIGN_UP,
    LOG_IN,
    USER_BOOKS,
    USER_CARDS,
    USER_NOTES,
    USER_NOTIFICATIONS,
    USER_BOOK_CARDS,
    USER_BOOK_NOTES,
    READ_BOOK, 
    CHECKOUT
}