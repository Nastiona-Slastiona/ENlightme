using Enlightme.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Enlightme.Entities;

public class Book : IHasId
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    [MaxLength(1500)]
    public string Description { get; set; }
    public string Author { get; set; }
    public DateTime Published { get; set; }

    public byte[]? Cover { get; set; }
    public byte[]? Content { get; set; }

    public int GenreId { get; set; }
    public int UserId { get; set; }
    public int LanguageId { get; set; }

    [NotMapped]
    public Genre Genre { get; set; }
    public Language Language { get; set; }
    public IReadOnlyList<Card> Cards { get; set; }
}
