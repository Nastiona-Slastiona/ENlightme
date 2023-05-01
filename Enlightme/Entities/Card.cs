using Enlightme.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Enlightme.Entities;

public class Card  : IHasId
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Value { get; set; }

    [Required]
    public string Translation { get; set; }

    public int LanguageId { get; set; }
    public int BookId { get; set; }
    public int IntervalId { get; set; }
    public int UserId { get; set; }
    public DateTime UpdateTime { get; set; } 

    public bool IsRepeated { get; set; }
    public bool IsLearned { get; set; }

    public Language Language { get; set; }
    public Book Book { get; set; }
    public Interval Interval { get; set; }
}
