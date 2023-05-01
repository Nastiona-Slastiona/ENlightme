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

    [Route("genres")]
    [HttpGet]
    public async Task<IActionResult> GetGenres()
    {
        IReadOnlyList<Genre> books = await bookService.GetGenres();

        return Ok(books);
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
}
