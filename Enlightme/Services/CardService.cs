using Enlightme.Constants;
using Enlightme.Dtos;
using Enlightme.Entities;
using Enlightme.Helpers;
using Enlightme.Repositories;
using Enlightme.Specifications;
using System.Net;

namespace Enlightme.Services;


public class CardService
{
    private readonly Repository<DataContext, Card> cardRepository;
    private readonly BookService bookService;

    public CardService(Repository<DataContext, Card> cardRepository, BookService bookService)
    {
        this.cardRepository = cardRepository;
        this.bookService = bookService;
    }

    public async Task<Card> CreateCard(CardData cardData, int userId)
    {
        var book = await bookService.GetBook(cardData.BookId);

        var card = new Card
        {
            Value = cardData.Value,
            Translation = cardData.Translation,
            LanguageId = book.LanguageId,
            BookId = cardData.BookId,
            IntervalId = 1,
            UpdateTime = DateTime.Now,
            UserId = userId
        };

        return await cardRepository.Create(card);
    }

    public async Task<bool> DeleteCard(int cardId)
    {
        try
        {
            await cardRepository.Delete(new Specification<Card>(c => c.Id == cardId));

            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    public async Task<int> GetNotificationAmount(int userId)
    {
        Specification<Card> specification = new(
            c => c.UserId == userId 
            && c.UpdateTime.AddMinutes(c.Interval.Minutes) < DateTime.Now);

        int notificationAmount = await cardRepository.Count(specification);

        return notificationAmount;
    }

    public async Task<IReadOnlyList<Card>> GetCards(int userId)
    {
         var included = new IncludedPropertyCollection<Card>() { 
            c => c.Interval,
            c => c.Language
        };

        Specification<Card> specification = new(
            c => c.UserId == userId
            && c.UpdateTime.AddMinutes(c.Interval.Minutes) < DateTime.Now);

        var cards = await cardRepository.GetList(specification, included);

        return cards;
    }

    public async Task<IReadOnlyList<Card>> GetAllCards(int userId)
    {
        var included = new IncludedPropertyCollection<Card>() {
            c => c.Interval,
            c => c.Language
        };

        Specification<Card> specification = new(c => c.UserId == userId);

        var cards = await cardRepository.GetList(specification, included);

        return cards;
    }

    public async Task<Card> UpdateCard(CardUpdateData cardUpdateData)
    {
        var card = await cardRepository.GetFirstOrDefault(new Specification<Card>(c => c.Id == cardUpdateData.CardId));
        
        if (card.IntervalId == ConstantInfo.MaxIntervalId)
        {
            card.IsLearned = true;
        }
        else
        {
            card.IntervalId += 1;
        }

        card.UpdateTime = DateTime.Now;

        await cardRepository.Update(card);

        return card;
    }
}
