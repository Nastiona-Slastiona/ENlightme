using System.ComponentModel.DataAnnotations;

namespace Enlightme.Entities;

public class Interval
{
    [Key]
    public int Id { get; set; }
    public int Minutes { get; set; }
}
