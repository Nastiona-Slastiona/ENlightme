using Enlightme.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Enlightme.Entities;

public class RefreshToken : IHasId
{
    [Key]
    public int Id { get; set; }
    public string Token { get; set; }
    public int UserId { get; set; }

    public User User { get; set; }
}
