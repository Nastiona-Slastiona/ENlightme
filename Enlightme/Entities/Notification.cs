using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Enlightme.Entities;

public class Notification
{
    [Key]
    public int Id { get; set; }
    public string Text { get; set; }
    public bool IsActive { get; set; }

    [NotMapped]
    public IReadOnlyList<int> CardsToRepeat { get; set; } 
}
