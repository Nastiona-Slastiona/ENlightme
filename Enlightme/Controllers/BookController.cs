using Enlightme.Core.Responses;
using Enlightme.Dtos;
using Enlightme.Entities;
using Enlightme.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Enlightme.Controllers;

[Route("book")]
[ApiController]
public class BookController : Controller
{
    private readonly BookService bookService;

    public BookController(BookService bookService)
    {
        this.bookService = bookService;
    }

    [Route("library")]
    [HttpGet]
    public async Task<IActionResult> GetBooks()
    {
        IReadOnlyList<Book> books = await bookService.GetBooks(null);

        return Created("success", books);
    }

    [Authorize]
    [Route("books")]
    [HttpGet]
    public async Task<IActionResult> GetUserBooks()
    {
        var rawUserId = HttpContext.User.FindFirstValue("id");

        if (!int.TryParse(rawUserId, out int userId))
        {
            return Unauthorized();
        }

        IReadOnlyList<Book> books = await bookService.GetBooks(userId);

        return Ok(books);
    }

    [Route("{bookId:int}")]
    [HttpGet]
    public async Task<IActionResult> GetBook(int bookId)
    {
        Book book = await bookService.GetBook(bookId);

        return Ok(book);
    }

    [Route("common-info")]
    [HttpGet]
    public async Task<IActionResult> GetGenres()
    {
        IReadOnlyList<Genre> genres = await bookService.GetGenres();
        IReadOnlyList<Language> languages = await bookService.GetLanguages();

        var data = new CommonData(genres, languages);

        return Ok(data);
    }

    [Route("languages")]
    [HttpGet]
    public async Task<IActionResult> GetLanguages()
    {
        IReadOnlyList<Language> languages = await bookService.GetLanguages();

        return Ok(languages);
    }

    [Authorize]
    [Route("create")]
    [HttpPost]
    public async Task<IActionResult> Create([FromForm] BookData bookData)
    {
        var rawUserId = HttpContext.User.FindFirstValue("id");

        if (!int.TryParse(rawUserId, out int userId))
        {
            return Unauthorized();
        }

        Book book = await bookService.CreateBook(bookData, userId);

        return Created("success", book);
    }

    [Authorize]
    [Route("delete/{bookId:int}")]
    [HttpDelete]
    public async Task<IActionResult> Delete(int bookId)
    {
        var rawUserId = HttpContext.User.FindFirstValue("id");

        if (!int.TryParse(rawUserId, out int userId))
        {
            return Unauthorized();
        }

        bool isDeleted = await bookService.DeleteBook(bookId);

        return isDeleted ? Ok(isDeleted) : BadRequest(new ErrorResponse("Can't delete the book."));
    }
}
