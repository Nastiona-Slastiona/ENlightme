using Enlightme.Dtos;
using Enlightme.Entities;
using Enlightme.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Enlightme.Controllers;

[Authorize]
[Route("card")]
[ApiController]
public class CardController : Controller
{
    private readonly CardService cardService;

    public CardController(CardService cardService)
    {
        this.cardService = cardService;
    }

    [Route("create")]
    [HttpPost]
    public async Task<IActionResult> Create(CardData cardData)
    {
        var rawUserId = HttpContext.User.FindFirstValue("id");

        if (!int.TryParse(rawUserId, out int userId))
        {
            return Unauthorized();
        }

        Card card = await cardService.CreateCard(cardData, userId);

        return Ok(card);
    }

    [Route("notifications")]
    [HttpGet]
    public async Task<IActionResult> GetNotifications()
    {
        var rawUserId = HttpContext.User.FindFirstValue("id");

        if (!int.TryParse(rawUserId, out int userId))
        {
            return Unauthorized();
        }

        int amount = await cardService.GetNotificationAmount(userId);

        return Ok(amount);
    }

    [Route("cards/learn/")]
    [HttpGet]
    public async Task<IActionResult> GetCards()
    {
        var rawUserId = HttpContext.User.FindFirstValue("id");

        if (!int.TryParse(rawUserId, out int userId))
        {
            return Unauthorized();
        }

        IReadOnlyList<Card> cards = await cardService.GetCards(userId);

        return Ok(cards);
    }

    [Route("cards")]
    [HttpGet]
    public async Task<IActionResult> GetAllCards()
    {
        var rawUserId = HttpContext.User.FindFirstValue("id");

        if (!int.TryParse(rawUserId, out int userId))
        {
            return Unauthorized();
        }

        IReadOnlyList<Card> cards = await cardService.GetAllCards(userId);

        return Ok(cards);
    }

    [Route("delete/{cardId:int}")]
    [HttpDelete]
    public async Task<IActionResult> Delete(int cardId)
    {
        bool result = await cardService.DeleteCard(cardId);

        return Ok(result);
    }

    [Route("{id:int}/update")]
    [HttpPost]
    public async Task<IActionResult> UpdateCard(CardUpdateData cardUpdateData)
    {
        var rawUserId = HttpContext.User.FindFirstValue("id");

        if (!int.TryParse(rawUserId, out int userId))
        {
            return Unauthorized();
        }

        var card = await cardService.UpdateCard(cardUpdateData);

        return Ok(card);
    }
}
