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
    private readonly Repository<DataContext, Language> languagesRepository;
    private readonly FileHelper fileHelper;

    public BookService(
        FileHelper fileHelper,
        Repository<DataContext, Book> bookRepository,
        Repository<DataContext, Genre> genreRepository,
        Repository<DataContext, Language> languagesRepository)
    {
        this.bookRepository = bookRepository;
        this.fileHelper = fileHelper;
        this.genreRepository = genreRepository;
        this.languagesRepository = languagesRepository;
    }

    public async Task<IReadOnlyList<Genre>> GetGenres()
    {
        var genres = await genreRepository.GetList();

        return genres;
    }

    public async Task<IReadOnlyList<Language>> GetLanguages()
    {
        var languages = await languagesRepository.GetList();

        return languages;
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

    public async Task<bool> DeleteBook(int bookId)
    {
        try
        {
            Specification<Book> specification = new(b => b.Id == bookId);

            await bookRepository.Delete(specification);

            return true;
        }   
        catch (Exception)
        {
            return false;
        }
    }
}
