using Enlightme.Dtos;
using Enlightme.Entities;
using Enlightme.Helpers;
using Enlightme.Repositories;
using Enlightme.Specifications;

namespace Enlightme.Services;

public class BookService
{
    private readonly Repository<DataContext, Book> bookRepository;
    private readonly Repository<DataContext, Genre> genreRepository;
    private readonly FileHelper fileHelper;

    public BookService(
        Repository<DataContext, Book> bookRepository,
        FileHelper fileHelper,
        Repository<DataContext, Genre> genreRepository)
    {
        this.bookRepository = bookRepository;
        this.fileHelper = fileHelper;
        this.genreRepository = genreRepository;
    }

    public async Task<IReadOnlyList<Genre>> GetGenres()
    {
        var genres = await genreRepository.GetList();

        return genres;
    }

    public async Task<IReadOnlyList<Book>> GetBooks(int? userId = null)
    {
        var includes = new IncludedPropertyCollection<Book>()
        {
            b => b.Genre
        };

        if (userId != null)
        {
            Specification<Book> specification = new(b => b.UserId == userId);

            return await bookRepository.GetList(specification, includes);
        }

        return await bookRepository.GetList(includes: includes);
    }

    public async Task<Book> GetBook(int bookId)
    {
        Specification<Book> specification = new(b => b.Id == bookId);
        var includes = new IncludedPropertyCollection<Book>()
        {
            b => b.Genre
        };

        return await bookRepository.GetFirstOrDefault(specification, includes);
    }

    public async Task<Book> CreateBook(BookData bookData, int userId)
    {
        var book = new Book
        {
            Title = bookData.Title,
            Description = bookData.Description,
            Author = bookData.Author,
            UserId = userId,
            GenreId = bookData.Genre,
            LanguageId = bookData.Language,
            Content = fileHelper.GetFileBytes(bookData.Book)
        };

        if (bookData.Cover != null )
        {
            book.Cover = fileHelper.GetFileBytes(bookData.Cover);
        }

        return await bookRepository.Create(book);
    }
}
