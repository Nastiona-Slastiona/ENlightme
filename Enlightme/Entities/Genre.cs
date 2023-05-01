using Enlightme.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Enlightme.Entities;

public class Genre : IHasId
{
    [Key]
    public int Id { get; set; }
    public string Type { get; set; }
}
