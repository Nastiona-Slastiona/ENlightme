using Enlightme.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Enlightme.Entities;

public class User: IHasId
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [StringLength(200)]
    public string FirstName { get; set; }
    [Required]
    [StringLength(200)]
    public string LastName { get; set; }
    
    [Required]
    [StringLength(200)]
    public string Email { get; set; }

    public DateTime BirthDate { get; set; }

    public string Password { get; set; }
    public bool IsSuperUser { get; set; }
    public bool ShouldSendNotifications { get; set; }

    public byte[] Image { get; set; }
}